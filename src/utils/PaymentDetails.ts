import type { Currencies } from "@/utils/typings/currencies";

interface IPaymentDetails {
	iban: string;
	currency: Currencies;
	invoiceDate: Date;
	dueDate: Date;
	invoiceNumber: string;
}

export class PaymentDetails implements IPaymentDetails {
	iban: string = "";
	currency: Currencies = "€";
	invoiceDate: Date = new Date(new Date().setUTCHours(0, 0, 0, 0));
	dueDate: Date = new Date(new Date(new Date().setMonth(new Date().getMonth() + 1)).setUTCHours(0, 0, 0, 0));
	invoiceNumber: string = "";

	constructor(paymentDetails?: IPaymentDetails) {
		if (paymentDetails) {
			this.iban = paymentDetails.iban;
			this.currency = paymentDetails.currency;
			this.invoiceDate = new Date(paymentDetails.invoiceDate);
			this.dueDate = new Date(paymentDetails.dueDate);
			this.invoiceNumber = paymentDetails.invoiceNumber;
		}
	}

	reset() {
		this.iban = "";
		this.currency = "€";
		this.invoiceDate = new Date(new Date().setUTCHours(0, 0, 0, 0));
		this.dueDate = new Date(new Date(new Date().setMonth(new Date().getMonth() + 1)).setUTCHours(0, 0, 0, 0));
		this.invoiceNumber = "";
	}
}
