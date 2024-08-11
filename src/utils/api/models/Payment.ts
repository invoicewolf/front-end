import { BasePaymentDetails, type IBasePaymentDetails } from "@/utils/BasePaymentDetails";

interface IPayment extends IBasePaymentDetails {
	id: number;
}

export class Payment extends BasePaymentDetails implements IPayment {
	id: number = -1;

	constructor(payment?: IPayment) {
		super(payment);
		if (payment) {
			this.id = payment.id;
		}
	}

	reset() {
		this.id = -1;
		super.reset();
	}
}
