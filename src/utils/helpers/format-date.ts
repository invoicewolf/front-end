export function formatDate(date: Date, locale: string) {
	return Intl.DateTimeFormat(locale, {
		year: "numeric",
		month: "long",
		day: "numeric",
	}).format(date);
}
