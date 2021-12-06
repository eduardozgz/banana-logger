export function deepReplaceAll(
	object,
	searchValue: string | RegExp,
	replaceValue: string
) {
	for (const key in object) {
		if (Object.prototype.hasOwnProperty.call(object, key)) {
			const value = object[key];

			if (typeof value === "object") {
				deepReplaceAll(value, searchValue, replaceValue);
			} else if (typeof value === "string") {
				object[key] = value.replaceAll(searchValue, replaceValue);
			}
		}
	}
}
