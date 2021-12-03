export function toggleArrayItem(array: any[], item: any): any[] {
	const arrayToToggle = Array.from(array);
	const found = arrayToToggle.indexOf(item);
	if (found >= 0) {
		arrayToToggle.splice(found, 1);
	} else {
		arrayToToggle.push(item);
	}
	return arrayToToggle;
}
