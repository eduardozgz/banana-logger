export function toggleArrayItem<T>(array: T[], item: T): [T[], boolean] {
  const arrayToToggle = Array.from(array);
  const index = arrayToToggle.indexOf(item);
  const wasPresent = index >= 0;
  if (wasPresent) {
    arrayToToggle.splice(index, 1);
  } else {
    arrayToToggle.push(item);
  }
  // Second element reports whether the item was ADDED (true) or removed (false),
  // matching how every caller names it (`wasAdded`).
  return [arrayToToggle, !wasPresent];
}
