import { BasePaymentDetails, type IBasePaymentDetails } from "@/utils/BasePaymentDetails";

export interface IPaymentDetails extends IBasePaymentDetails {
	invoiceDate: Date;
	dueDate: Date;
	invoiceNumber: string;
}

export class PaymentDetails extends BasePaymentDetails implements IPaymentDetails {
	invoiceDate: Date = new Date(new Date().setUTCHours(0, 0, 0, 0));
	dueDate: Date = new Date(new Date(new Date().setMonth(new Date().getMonth() + 1)).setUTCHours(0, 0, 0, 0));
	invoiceNumber: string = "";

	constructor(paymentDetails?: IBasePaymentDetails | IPaymentDetails) {
		super(paymentDetails);
		if (paymentDetails && "invoiceDate" in paymentDetails) {
			this.invoiceDate = new Date(paymentDetails.invoiceDate);
			this.dueDate = new Date(paymentDetails.dueDate);
			this.invoiceNumber = paymentDetails.invoiceNumber;
		}
	}

	reset() {
		super.reset();
		this.invoiceDate = new Date(new Date().setUTCHours(0, 0, 0, 0));
		this.dueDate = new Date(new Date(new Date().setMonth(new Date().getMonth() + 1)).setUTCHours(0, 0, 0, 0));
		this.invoiceNumber = "";
	}
}
