import { DurationFormat } from "@formatjs/intl-durationformat";

import type { DurationInput } from "@formatjs/intl-durationformat/src/types";

function decomposeDuration(totalSeconds: number): DurationInput {
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const result: DurationInput = {};
  if (days) result.days = days;
  if (hours) result.hours = hours;
  if (minutes) result.minutes = minutes;
  if (seconds) result.seconds = seconds;

  return result;
}

export const formatTimeDuration = (locale: string, duration: number) => {
  const decomposed = decomposeDuration(duration);
  const durationFormatter = new DurationFormat(locale, {
    style: "long",
  });

  return durationFormatter.format(decomposed);
};
