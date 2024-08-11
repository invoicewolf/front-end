import { i18n } from "@/main";
import { formatCurrencySymbol } from "@/utils/helpers/format-currency-symbol";
import type { CurrencyStrings } from "@/utils/typings/currencies";

export function formatCurrencyInvoice(value: number, currency: CurrencyStrings, addCurrencySymbol = true) {
	return addCurrencySymbol
		? Intl.NumberFormat(i18n.global.t("localeString"), { style: "currency", currency }).format(value)
		: Intl.NumberFormat(i18n.global.t("localeString"), { style: "currency", currency }).format(value).replace(formatCurrencySymbol(currency), "");
}
