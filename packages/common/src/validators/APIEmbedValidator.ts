import { z } from "zod/v4";

/**
 * Discord API Embed Field Schema
 * - name: max 256 characters
 * - value: max 1024 characters
 * - inline: optional boolean
 */
export const embedFieldSchema = z.object({
  name: z.string().min(1).max(256),
  value: z.string().min(1).max(1024),
  inline: z.boolean().optional(),
});

/**
 * Discord API Embed Author Schema
 * - name: max 256 characters
 * - url: optional valid URL
 * - icon_url: optional valid URL
 */
export const embedAuthorSchema = z.object({
  name: z.string().min(1).max(256),
  url: z.url().optional(),
  icon_url: z.url().optional(),
});

/**
 * Discord API Embed Footer Schema
 * - text: max 2048 characters
 * - icon_url: optional valid URL
 */
export const embedFooterSchema = z.object({
  text: z.string().min(1).max(2048),
  icon_url: z.url().optional(),
});

/**
 * Discord API Embed Image Schema
 * - url: required valid URL
 */
export const embedImageSchema = z.object({
  url: z.url(),
});

/**
 * Discord API Embed Thumbnail Schema
 * - url: required valid URL
 */
export const embedThumbnailSchema = z.object({
  url: z.url(),
});

/**
 * Discord API Embed Schema
 *
 * Constraints:
 * - title: max 256 characters
 * - description: max 4096 characters
 * - url: optional valid URL
 * - timestamp: ISO8601 timestamp
 * - color: integer from 0 to 16777215 (0xFFFFFF)
 * - fields: max 25 fields
 * - footer: optional footer object
 * - image: optional image object
 * - thumbnail: optional thumbnail object
 * - video: optional video object (read-only)
 * - provider: optional provider object (read-only)
 * - author: optional author object
 *
 * Total character limit: 6000 characters across all text fields
 */
export const apiEmbedSchema = z
  .object({
    title: z.string().max(256).optional(),
    description: z.string().max(4096).optional(),
    url: z.url().optional(),
    timestamp: z.iso.datetime().optional(),
    color: z.number().int().min(0).max(0xffffff).optional(),
    footer: embedFooterSchema.optional(),
    image: embedImageSchema.optional(),
    thumbnail: embedThumbnailSchema.optional(),
    author: embedAuthorSchema.optional(),
    fields: z.array(embedFieldSchema).max(25).optional(),
  })
  .refine(
    (embed) => {
      // Calculate total character count across all text fields
      const titleLength = embed.title?.length ?? 0;
      const descriptionLength = embed.description?.length ?? 0;
      const footerLength = embed.footer?.text.length ?? 0;
      const authorLength = embed.author?.name.length ?? 0;
      const fieldsLength =
        embed.fields?.reduce(
          (total, field) => total + field.name.length + field.value.length,
          0,
        ) ?? 0;

      const totalLength =
        titleLength +
        descriptionLength +
        footerLength +
        authorLength +
        fieldsLength;
      return totalLength <= 6000;
    },
    {
      message:
        "Total character count across all embed text fields must not exceed 6000 characters",
    },
  )
  .refine(
    (embed) => {
      // Ensure embed has at least one field with content
      return (
        embed.title ??
        embed.description ??
        embed.fields?.length ??
        embed.image ??
        embed.thumbnail ??
        embed.author ??
        embed.footer
      );
    },
    {
      message: "Embed must have at least one field with content",
    },
  );
