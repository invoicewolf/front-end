import { type IInvoice, Invoice } from "@/utils/Invoice";

export class InvoiceManager {
	invoice: Invoice;

	constructor() {
		this.invoice = new Invoice();
	}

	new() {
		this.invoice.reset();
	}

	open(data: IInvoice) {
		this.invoice = new Invoice(data);
	}

	getData() {
		return JSON.stringify(this.invoice);
	}
}
