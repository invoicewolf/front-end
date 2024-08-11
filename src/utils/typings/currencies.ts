export const currencies: { val: CurrencyStrings; label: CurrencyCharacters }[] = [
	{
		val: "EUR",
		label: "€",
	},
	{
		val: "USD",
		label: "$",
	},
	{
		val: "GBP",
		label: "£",
	},
] as const;

export const currencyStrings = ["EUR", "USD", "GBP"] as const;
export const currencyCharacters = ["€", "$", "£"] as const;

export type CurrencyStrings = typeof currencyStrings[number];
export type CurrencyCharacters = typeof currencyCharacters[number];
