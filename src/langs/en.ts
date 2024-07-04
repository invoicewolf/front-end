import type { languageInterface } from "@/langs/type";

export const en = {
	general: {
		menu: {
			invoice: "Invoice",
			new: "New",
			open: "Open",
			save: "Save",
			exportToPdf: "Export as PDF",
		},
		stepper: {
			step1: "Company details",
			step2: "Addressee details",
			step3: "Products",
			step4: "Payment details",
			step5: "Review",
			next: "Next",
			previous: "Previous",
		},
		forms: {
			requiredExplanation: "These fields are required to be filled",
		},
		currency: "Currency",
	},
	addressDetails: {
		labels: {
			zipCode: "Zip code",
			houseNumber: "Number",
			streetName: "Street name",
			city: "City",
		},
	},
	companyDetails: {
		labels: {
			representativeName: "Representative name",
			representativeEmail: "Representative email",
			companyName: "Company name",
			companyNumber: "Company number",
			taxNumber: "Tax number",
		},
		descriptions: {
			notAddingCompanyNumber: "Not adding a company number makes a legally invalid invoice.",
			notAddingTaxNumber: "Not adding a VAT number makes a legally invalid invoice.",
		},
	},
	addresseeDetails: {
		labels: {
			organizationName: "Organization name",
			attentionName: "Attention name",
			subjectName: "Subject name",
		},
	},
	products: {
		table: {
			description: "Description",
			amount: "Amount",
			tariff: "Tariff",
			taxRate: "VAT%",
			cost: "Cost",
			subtotal: "Subtotal",
			taxAmount: "VAT amount",
			totalIncludingTax: "Total incl. VAT",
		},
		elements: {
			buttons: {
				newProduct: "New product",
			},
		},
	},
	paymentDetails: {
		labels: {
			iban: "Bank number",
			currency: "Currency",
			invoiceDateAndDueDate: "Invoice date & due date",
			invoiceNumber: "Invoice number",
		},
	},
	review: {
		labels: {
			save: "Save",
			saveAsInvoice: "Save as .invoice",
			saveAsPdf: "Export to PDF",
		},
	},
	invoice: {
		invoice: "Invoice",
		regarding: "Regarding",
		termsAndConditions: "Terms and conditions",
		allPricesExcludeVAT: "All mentioned prices are without VAT",
		paymentTerm: "The payment term is within {days} days of the invoice date",
		paymentTo: "The payment must be transferred to",
		questionsOrRemarksContact: "If you have any questions and/or remarks, you can contact",
		companyDetails: {
			companyNumber: "KVK",
			taxNumber: "VAT",
		},
		addresseeDetails: {
			attentionName: "Attn.",
			subjectName: "Subject:",
		},
		table: {
			description: "Description",
			amount: "Amount",
			tariff: "Tariff",
			taxRate: "VAT%",
			cost: "Cost",
			subtotal: "Subtotal",
			taxAmount: "VAT amount",
			totalIncludingTax: "Total incl. VAT",
		},
	},
} satisfies languageInterface;
