import { formatCurrencyInvoice } from "@/utils/helpers/format-currency-invoice";

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

	getFormattedPrice() {
		return {
			subtotal: formatCurrencyInvoice(this.subtotal),
			taxAmount: formatCurrencyInvoice(this.taxAmount),
			total: formatCurrencyInvoice(this.total),
		};
	}
}
