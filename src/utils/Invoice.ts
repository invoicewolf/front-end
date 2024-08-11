import { AddresseeDetails } from "@/utils/AddresseeDetails";
import { CompanyDetails } from "@/utils/CompanyDetails";
import { PaymentDetails } from "@/utils/PaymentDetails";
import { Price } from "@/utils/Prices";
import { Product } from "@/utils/Product";

export interface IInvoice {
	companyDetails: CompanyDetails;
	addresseeDetails: AddresseeDetails;
	products: Product[];
	price: Price;
	paymentDetails: PaymentDetails;
}

export class Invoice implements IInvoice {
	companyDetails: CompanyDetails = new CompanyDetails();
	addresseeDetails: AddresseeDetails = new AddresseeDetails();
	products: Product[] = [];
	price: Price = new Price();
	paymentDetails: PaymentDetails = new PaymentDetails();

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

	getFormattedProducts(addCurrencySymbol = true) {
		return this.products.map(product => product.getFormattedProduct(this.paymentDetails.currency, addCurrencySymbol));
	}

	getFormattedPrice(addCurrencySymbol = true) {
		return this.price.getFormattedPrice(this.paymentDetails.currency, addCurrencySymbol);
	}

	reset() {
		this.companyDetails.reset();
		this.addresseeDetails.reset();
		this.products.length = 0;
		this.paymentDetails.reset();
	}
}
