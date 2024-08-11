import { formatCurrencyInvoice } from "@/utils/helpers/format-currency-invoice";
import type { CurrencyStrings } from "@/utils/typings/currencies";

export interface IPrice {
	subtotal: number;
	taxAmount: number;
	total: number;
}

export class Price implements IPrice {
	subtotal: number = 0;
	taxAmount: number = 0;
	total: number = 0;

	constructor(price?: IPrice) {
		if (price) {
			this.subtotal = price.subtotal;
			this.taxAmount = price.taxAmount;
			this.total = price.total;
		}
	}

	getFormattedPrice(currency: CurrencyStrings, addCurrencySymbol: boolean) {
		return {
			subtotal: formatCurrencyInvoice(this.subtotal, currency, addCurrencySymbol),
			taxAmount: formatCurrencyInvoice(this.taxAmount, currency, addCurrencySymbol),
			total: formatCurrencyInvoice(this.total, currency, addCurrencySymbol),
		};
	}
}
