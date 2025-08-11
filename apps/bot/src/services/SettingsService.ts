import type { APIEmbed, Guild, GuildTextBasedChannel } from "discord.js";
import _ from "lodash";

import type { Settings, SettingsTemplate, Template } from "@/db/client";
import { db } from "@/db";
import { EventType } from "@/db/client";

import { ALL_EVENTS_CHOICE } from "~/Constants";
import { toggleArrayItem } from "~/utils/toggleArrayItem";
import { UserError } from "~/utils/UserError";
import GlobalSettingsService from "./GlobalSettingsService";

export class SettingsService {
  private constructor(
    private settings: Settings & {
      templates: (SettingsTemplate & { template: Template })[];
    },
    private globalSettingsService: GlobalSettingsService,
  ) {}

  public static async init(
    channel: GuildTextBasedChannel,
    globalSettingsService?: GlobalSettingsService | Guild,
  ): Promise<SettingsService> {
    const settings = await db.settings.upsert({
      where: {
        guildId_channelId: {
          guildId: channel.guild.id,
          channelId: channel.id,
        },
      },
      update: {},
      create: {
        guildId: channel.guild.id,
        channelId: channel.id,
      },
      include: {
        templates: {
          include: {
            template: true,
          },
        },
      },
    });

    return new SettingsService(
      settings,
      globalSettingsService instanceof GlobalSettingsService
        ? globalSettingsService
        : await GlobalSettingsService.init(
            globalSettingsService ?? channel.guild,
          ),
    );
  }

  public static async getByEventName(
    eventType: EventType,
    guild: Guild,
  ): Promise<SettingsService[]> {
    const globalSettings = await GlobalSettingsService.init(guild);
    const settings = await db.settings.findMany({
      where: {
        guildId: guild.id,
        watchingEvents: {
          has: eventType,
        },
      },
      include: {
        templates: {
          include: {
            template: true,
          },
        },
      },
    });

    return settings.map(
      (setting) => new SettingsService(setting, globalSettings),
    );
  }

  get id() {
    return this.settings.id;
  }

  get ignoredChannels() {
    return [
      ...this.settings.ignoredChannels,
      ...this.globalSettingsService.ignoredChannels,
    ];
  }

  async toggleIgnoreChannel(channelId: string): Promise<boolean> {
    const [result, wasAdded] = toggleArrayItem(
      this.settings.ignoredChannels,
      channelId,
    );

    await db.settings.update({
      where: { id: this.settings.id },
      data: { ignoredChannels: result },
    });

    this.settings.ignoredChannels = result;
    return wasAdded;
  }

  get watchChannels() {
    return [...this.settings.watchChannels];
  }

  async toggleWatchChannel(channelId: string): Promise<boolean> {
    const [result, wasAdded] = toggleArrayItem(
      this.settings.watchChannels,
      channelId,
    );

    await db.settings.update({
      where: { id: this.settings.id },
      data: { watchChannels: result },
    });

    this.settings.watchChannels = result;
    return wasAdded;
  }

  get ignoredUsers() {
    return [
      ...this.settings.ignoredUsers,
      ...this.globalSettingsService.ignoredUsers,
    ];
  }

  async toggleIgnoreUser(userId: string): Promise<boolean> {
    const [result, wasAdded] = toggleArrayItem(
      this.settings.ignoredUsers,
      userId,
    );

    await db.settings.update({
      where: { id: this.settings.id },
      data: { ignoredUsers: result },
    });

    this.settings.ignoredUsers = result;
    return wasAdded;
  }

  get watchUsers() {
    return [...this.settings.watchUsers];
  }

  async toggleWatchUser(userId: string): Promise<boolean> {
    const [result, wasAdded] = toggleArrayItem(
      this.settings.watchUsers,
      userId,
    );

    await db.settings.update({
      where: { id: this.settings.id },
      data: { watchUsers: result },
    });

    this.settings.watchUsers = result;
    return wasAdded;
  }

  getTemplate(eventType: EventType): APIEmbed | null {
    // First try to get template from local settings
    const localTemplateAssignment = this.settings.templates.find(
      (t) => t.eventType === eventType,
    );

    if (localTemplateAssignment) {
      return localTemplateAssignment.template.embedOptions as APIEmbed;
    }

    // Fall back to global template
    return this.globalSettingsService.getTemplate(eventType);
  }

  async setTemplate(eventType: EventType, templateId: string): Promise<void> {
    // Validate event type
    if (!Object.values(EventType).includes(eventType)) {
      throw new UserError("Provided event type is not valid");
    }

    // Check if template exists
    const template = await db.template.findUnique({
      where: { id: templateId },
    });

    if (!template) {
      throw new UserError("Template not found");
    }

    // Upsert the template assignment
    await db.settingsTemplate.upsert({
      where: {
        settingsId_eventType: {
          settingsId: this.settings.id,
          eventType: eventType,
        },
      },
      update: {
        templateId: templateId,
      },
      create: {
        settingsId: this.settings.id,
        templateId: templateId,
        eventType: eventType,
      },
    });

    // Update local cache - reload the settings to get the updated data
    const updatedSettings = await db.settings.findUnique({
      where: { id: this.settings.id },
      include: {
        templates: {
          include: {
            template: true,
          },
        },
      },
    });

    if (updatedSettings) {
      this.settings.templates = updatedSettings.templates;
    }
  }

  async removeTemplate(eventType: EventType): Promise<void> {
    // Validate event type
    if (!Object.values(EventType).includes(eventType)) {
      throw new UserError("Provided event type is not valid");
    }

    // Remove the template assignment
    await db.settingsTemplate.deleteMany({
      where: {
        settingsId: this.settings.id,
        eventType: eventType,
      },
    });

    // Update local cache
    this.settings.templates = this.settings.templates.filter(
      (t) => t.eventType !== eventType,
    );
  }

  get events(): EventType[] {
    return [...this.settings.watchingEvents];
  }

  async toggleEvent(
    event: typeof ALL_EVENTS_CHOICE | EventType,
  ): Promise<boolean> {
    let wasAdded: boolean;

    if (event === ALL_EVENTS_CHOICE) {
      const allEvents = Object.values(EventType);

      if (this.events.length === allEvents.length) {
        wasAdded = true;

        await db.settings.update({
          where: { id: this.settings.id },
          data: { watchingEvents: [] },
        });

        this.settings.watchingEvents = [];
      } else {
        wasAdded = false;

        await db.settings.update({
          where: { id: this.settings.id },
          data: { watchingEvents: allEvents },
        });

        this.settings.watchingEvents = allEvents;
      }
    } else {
      const [result, found] = toggleArrayItem(
        this.settings.watchingEvents,
        event,
      );

      await db.settings.update({
        where: { id: this.settings.id },
        data: { watchingEvents: result },
      });

      this.settings.watchingEvents = result;
      wasAdded = found;
    }

    return wasAdded;
  }

  getAssignedTemplates(): { eventType: EventType; template: Template }[] {
    return this.settings.templates.map((t) => ({
      eventType: t.eventType,
      template: t.template,
    }));
  }
}

export default SettingsService;
