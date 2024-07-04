import { formatCurrencyInvoice } from "@/utils/helpers/format-currency-invoice";

export interface IProduct {
	description: string;
	amount: number;
	tariff: number;
	taxRate: number;
	cost: number;
}

export class Product implements IProduct {
	description: string = "";
	amount: number = 0;
	tariff: number = 0;
	taxRate: number = 0;
	cost: number = 0;

	constructor(product?: IProduct) {
		if (product) {
			this.description = product.description;
			this.amount = product.amount;
			this.tariff = product.tariff;
			this.taxRate = product.taxRate;
			this.cost = product.cost;
		}
	}

	calculateCost() {
		this.cost = this.tariff * this.amount;
	}

	getFormattedProduct() {
		this.calculateCost();

		return {
			description: this.description,
			amount: `${this.amount}`,
			tariff: formatCurrencyInvoice(this.tariff),
			taxRate: `${this.taxRate}%`,
			cost: formatCurrencyInvoice(this.cost),
		};
	}
}
