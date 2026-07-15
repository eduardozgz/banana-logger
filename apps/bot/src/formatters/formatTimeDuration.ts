import { DurationFormat } from "@formatjs/intl-durationformat";

type DurationInput = Parameters<DurationFormat["format"]>[0];

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

  // DurationFormat.format({}) throws "Invalid duration format", so never return
  // an empty record (e.g. a duration of 0).
  if (Object.keys(result).length === 0) result.seconds = 0;

  return result;
}

export const formatTimeDuration = (locale: string, duration: number) => {
  const decomposed = decomposeDuration(duration);
  const durationFormatter = new DurationFormat(locale, {
    style: "long",
  });

  return durationFormatter.format(decomposed);
};
