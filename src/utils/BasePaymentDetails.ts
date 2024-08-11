import type { CurrencyStrings } from "@/utils/typings/currencies";

export interface IBasePaymentDetails {
	iban: string;
	currency: CurrencyStrings;
}

export class BasePaymentDetails implements IBasePaymentDetails {
	iban: string = "";
	currency: CurrencyStrings = "EUR";

	constructor(basePaymentDetails?: IBasePaymentDetails) {
		if (basePaymentDetails) {
			this.iban = basePaymentDetails.iban;
			this.currency = basePaymentDetails.currency;
		}
	}

	reset() {
		this.iban = "";
		this.currency = "EUR";
	}
}
