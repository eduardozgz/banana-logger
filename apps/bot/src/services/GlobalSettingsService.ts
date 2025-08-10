import type { APIEmbed, Guild } from "discord.js";
import _ from "lodash";

import type {
  GlobalSettings,
  GlobalSettingsTemplate,
  Template,
} from "@/db/client";
import { db } from "@/db";
import { EventType } from "@/db/client";

import { toggleArrayItem } from "~/utils/toggleArrayItem";
import { UserError } from "~/utils/UserError";

export class GlobalSettingsService {
  private constructor(
    private settings: GlobalSettings & {
      templates: (GlobalSettingsTemplate & { template: Template })[];
    },
  ) {}

  public static async init(guild: Guild): Promise<GlobalSettingsService> {
    const settings = await db.globalSettings.upsert({
      where: { guildId: guild.id },
      update: {},
      create: { guildId: guild.id },
      include: {
        templates: {
          include: {
            template: true,
          },
        },
      },
    });

    return new GlobalSettingsService(settings);
  }

  get id() {
    return this.settings.id;
  }

  get ignoredChannels() {
    return [...this.settings.ignoredChannels];
  }

  async toggleIgnoreChannel(channelId: string): Promise<boolean> {
    const [result, wasAdded] = toggleArrayItem(
      this.settings.ignoredChannels,
      channelId,
    );

    await db.globalSettings.update({
      where: { id: this.settings.id },
      data: { ignoredChannels: result },
    });

    this.settings.ignoredChannels = result;
    return wasAdded;
  }

  get ignoredUsers() {
    return [...this.settings.ignoredUsers];
  }

  async toggleIgnoreUser(userId: string): Promise<boolean> {
    const [result, wasAdded] = toggleArrayItem(
      this.settings.ignoredUsers,
      userId,
    );

    await db.globalSettings.update({
      where: { id: this.settings.id },
      data: { ignoredUsers: result },
    });

    this.settings.ignoredUsers = result;
    return wasAdded;
  }

  getTemplate(eventType: EventType): APIEmbed | null {
    // Validate event type
    if (!Object.values(EventType).includes(eventType)) {
      throw new UserError("Provided event type is not valid");
    }

    // Find template for this event type
    const templateAssignment = this.settings.templates.find(
      (t) => t.eventType === eventType,
    );

    if (!templateAssignment) {
      return null; // No template set for this event type
    }

    // Return the embed options from the template
    return templateAssignment.template.embedOptions as APIEmbed;
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
    await db.globalSettingsTemplate.upsert({
      where: {
        globalSettingsId_eventType: {
          globalSettingsId: this.settings.id,
          eventType: eventType,
        },
      },
      update: {
        templateId: templateId,
      },
      create: {
        globalSettingsId: this.settings.id,
        templateId: templateId,
        eventType: eventType,
      },
    });

    // Update local cache - reload the settings to get the updated data
    const updatedSettings = await db.globalSettings.findUnique({
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
    await db.globalSettingsTemplate.deleteMany({
      where: {
        globalSettingsId: this.settings.id,
        eventType: eventType,
      },
    });

    // Update local cache
    this.settings.templates = this.settings.templates.filter(
      (t) => t.eventType !== eventType,
    );
  }

  getAssignedTemplates(): { eventType: EventType; template: Template }[] {
    return this.settings.templates.map((t) => ({
      eventType: t.eventType,
      template: t.template,
    }));
  }
}

export default GlobalSettingsService;
