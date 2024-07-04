import { isDecimal } from "@/utils/helpers/is-decimal";

export function formatCurrencyInvoice(value: number) {
	return isDecimal(value)
		? value
			.toFixed(2)
			.toString()
			.replace(".", ",")
		: `${value},-`;
}
