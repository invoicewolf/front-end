import { i18n } from "@/main";
import type { CurrencyStrings } from "@/utils/typings/currencies";

export function formatCurrencySymbol(currency: CurrencyStrings) {
	return Intl.NumberFormat(i18n.global.t("localeString"), { style: "currency", currency, minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(0).replace(/\d/g, "").trim();
}
