import { AddresseeDetails } from "@/utils/AddresseeDetails";
import { CompanyDetails } from "@/utils/CompanyDetails";
import { PaymentDetails } from "@/utils/PaymentDetails";
import { Price } from "@/utils/Prices";
import { Product } from "@/utils/Product";

export interface IInvoice {
	readonly companyDetails: CompanyDetails;
	readonly addresseeDetails: AddresseeDetails;
	readonly products: Product[];
	readonly price: Price;
	readonly paymentDetails: PaymentDetails;
}

export class Invoice implements IInvoice {
	readonly companyDetails: CompanyDetails = new CompanyDetails();
	readonly addresseeDetails: AddresseeDetails = new AddresseeDetails();
	readonly products: Product[] = [];
	readonly price: Price = new Price();
	readonly paymentDetails: PaymentDetails = new PaymentDetails();

	constructor(invoice?: IInvoice) {
		if (invoice) {
			this.companyDetails = new CompanyDetails(invoice.companyDetails);
			this.addresseeDetails = new AddresseeDetails(invoice.addresseeDetails);
			this.products = invoice.products.map(product => new Product(product));
			this.price = new Price(invoice.price);
			this.paymentDetails = new PaymentDetails(invoice.paymentDetails);
		}
	}

	calculatePrice() {
		let subtotal = 0;
		let taxAmount = 0;

		this.products.forEach((product) => {
			subtotal += product.cost;
			taxAmount += product.cost * product.taxRate / 100;
		});

		this.price.subtotal = subtotal;
		this.price.taxAmount = taxAmount;
		this.price.total = subtotal + taxAmount;

		return this;
	}

	addProduct(product: Product) {
		this.products.push(product);

		return this;
	}

	getFormattedProducts() {
		return this.products.map(product => product.getFormattedProduct());
	}

	getFormattedPrice() {
		return this.price.getFormattedPrice();
	}

	reset() {
		this.companyDetails.reset();
		this.addresseeDetails.reset();
		this.products.length = 0;
		this.paymentDetails.reset();
	}
}
