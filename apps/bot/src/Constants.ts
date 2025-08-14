import type { EventType } from "@/db/client";

export const Colors = {
  RED: 0xed4245,
  GREEN: 0x57f287,
  YELLOW: 0xfee75c,
  BLURPLE: 0x5865f2,
  FUCHSIA: 0xeb459e,
  WHITE: 0xffffff,
  BLACK: 0x000000,
};

export const EmbedTemplatePlaceholders = {
  guildMemberNicknameChange: [
    "MEMBER_MENTION",
    "MEMBER_AVATAR",
    "MEMBER_ID",
    "OLD_NICKNAME",
    "NEW_NICKNAME",
    "EXECUTOR_MENTION",
    "EXECUTOR_ID",
    "EXECUTOR_AVATAR",
  ],
} as const satisfies Record<EventType, string[]>;

export const ALL_EVENTS_CHOICE = "all";
