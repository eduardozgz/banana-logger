import type { APIEmbed, Guild } from "discord.js";

import type { Prisma, Template } from "@/db/client";
import { apiEmbedSchema } from "@/common/validators/APIEmbedValidator";
import { db } from "@/db";
import { EventType } from "@/db/client";
import { i18nDefault } from "@/i18n";

import { UserError } from "~/utils/UserError";

export interface CreateTemplateData {
  guildId: string;
  name: string;
  description?: string;
  eventType: EventType;
  embedOptions: APIEmbed;
}

export interface UpdateTemplateData {
  name?: string;
  description?: string;
  eventType?: EventType;
  embedOptions?: APIEmbed;
}

export class TemplateService {
  private constructor(private template: Template) {}

  public static async create(
    data: CreateTemplateData,
  ): Promise<TemplateService> {
    // Validate embed options
    apiEmbedSchema.parse(data.embedOptions);

    // Validate event type
    if (!Object.values(EventType).includes(data.eventType)) {
      throw new UserError("Invalid event type provided");
    }

    const template = await db.template.create({
      data: {
        guildId: data.guildId,
        name: data.name,
        description: data.description,
        eventType: data.eventType,
        embedOptions: data.embedOptions as Prisma.InputJsonValue,
      },
    });

    return new TemplateService(template);
  }

  public static async findById(id: string): Promise<TemplateService | null> {
    const template = await db.template.findUnique({
      where: { id },
    });

    return template ? new TemplateService(template) : null;
  }

  public static async findByGuild(
    guild: Guild | string,
  ): Promise<TemplateService[]> {
    const guildId = typeof guild === "string" ? guild : guild.id;

    const templates = await db.template.findMany({
      where: { guildId },
      orderBy: [{ eventType: "asc" }, { name: "asc" }],
    });

    return templates.map((template) => new TemplateService(template));
  }

  public static async findByGuildAndEventType(
    guild: Guild | string,
    eventType: EventType,
  ): Promise<TemplateService[]> {
    const guildId = typeof guild === "string" ? guild : guild.id;

    const templates = await db.template.findMany({
      where: {
        guildId,
        eventType,
      },
      orderBy: { name: "asc" },
    });

    return templates.map((template) => new TemplateService(template));
  }

  public static async search(
    guild: Guild | string,
    query: {
      name?: string;
      eventType?: EventType;
      description?: string;
    },
  ): Promise<TemplateService[]> {
    const guildId = typeof guild === "string" ? guild : guild.id;

    const where: Prisma.TemplateWhereInput = { guildId };

    if (query.eventType) {
      where.eventType = query.eventType;
    }

    if (query.name) {
      where.name = {
        contains: query.name,
        mode: "insensitive",
      };
    }

    if (query.description) {
      where.description = {
        contains: query.description,
        mode: "insensitive",
      };
    }

    const templates = await db.template.findMany({
      where,
      orderBy: [{ eventType: "asc" }, { name: "asc" }],
    });

    return templates.map((template) => new TemplateService(template));
  }

  public static async getUsageCount(templateId: string): Promise<{
    globalSettings: number;
    settings: number;
    total: number;
  }> {
    const [globalCount, settingsCount] = await Promise.all([
      db.globalSettingsTemplate.count({
        where: { templateId },
      }),
      db.settingsTemplate.count({
        where: { templateId },
      }),
    ]);

    return {
      globalSettings: globalCount,
      settings: settingsCount,
      total: globalCount + settingsCount,
    };
  }

  public static createFromBaseTemplate(
    guildId: string,
    name: string,
    eventType: EventType,
    description?: string,
  ): Promise<TemplateService> {
    const baseTemplate = i18nDefault.t(`baseTemplates:${eventType}`, {
      returnObjects: true,
    });

    return this.create({
      guildId,
      name,
      description,
      eventType,
      embedOptions: { ...baseTemplate } as APIEmbed,
    });
  }

  // Instance methods
  get id(): string {
    return this.template.id;
  }

  get guildId(): string {
    return this.template.guildId;
  }

  get name(): string {
    return this.template.name;
  }

  get description(): string | null {
    return this.template.description;
  }

  get eventType(): EventType {
    return this.template.eventType;
  }

  get embedOptions(): APIEmbed {
    return this.template.embedOptions as APIEmbed;
  }

  async update(data: UpdateTemplateData): Promise<void> {
    // Validate embed options if provided
    if (data.embedOptions) {
      apiEmbedSchema.parse(data.embedOptions);
    }

    // Validate event type if provided
    if (data.eventType && !Object.values(EventType).includes(data.eventType)) {
      throw new UserError("Invalid event type provided");
    }

    const updatedTemplate = await db.template.update({
      where: { id: this.template.id },
      data: {
        ...data,
        embedOptions: data.embedOptions
          ? (data.embedOptions as Prisma.InputJsonValue)
          : undefined,
      },
    });

    // Update local instance
    Object.assign(this.template, updatedTemplate);
  }

  async delete(force = false): Promise<void> {
    if (!force) {
      // Check if template is in use
      const usage = await TemplateService.getUsageCount(this.template.id);

      if (usage.total > 0) {
        throw new UserError(
          `Cannot delete template "${this.template.name}". It is currently assigned to ${usage.globalSettings} global setting(s) and ${usage.settings} channel setting(s).`,
        );
      }
    }

    await db.template.delete({
      where: { id: this.template.id },
    });
  }

  async clone(
    newName: string,
    newDescription?: string,
  ): Promise<TemplateService> {
    return TemplateService.create({
      guildId: this.template.guildId,
      name: newName,
      description: newDescription,
      eventType: this.template.eventType,
      embedOptions: JSON.parse(
        JSON.stringify(this.template.embedOptions),
      ) as APIEmbed,
    });
  }

  async getAssignments(): Promise<{
    globalSettings: { id: string; guildId: string }[];
    settings: { id: string; guildId: string; channelId: string }[];
  }> {
    const [globalAssignments, settingsAssignments] = await Promise.all([
      db.globalSettingsTemplate.findMany({
        where: { templateId: this.template.id },
        include: {
          globalSettings: {
            select: { id: true, guildId: true },
          },
        },
      }),
      db.settingsTemplate.findMany({
        where: { templateId: this.template.id },
        include: {
          settings: {
            select: { id: true, guildId: true, channelId: true },
          },
        },
      }),
    ]);

    return {
      globalSettings: globalAssignments.map((a) => a.globalSettings),
      settings: settingsAssignments.map((a) => a.settings),
    };
  }

  toJSON() {
    return {
      id: this.template.id,
      guildId: this.template.guildId,
      name: this.template.name,
      description: this.template.description,
      eventType: this.template.eventType,
      embedOptions: this.template.embedOptions,
    };
  }
}

export default TemplateService;
