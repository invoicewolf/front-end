export interface languageInterface {
	general: {
		menu: {
			invoice: string;
			new: string;
			open: string;
			save: string;
			exportToPdf: string;
		};
		stepper: {
			step1: string;
			step2: string;
			step3: string;
			step4: string;
			step5: string;
			next: string;
			previous: string;
		};
		forms: {
			requiredExplanation: string;
		};
		currency: string;
	};
	addressDetails: {
		labels: {
			zipCode: string;
			houseNumber: string;
			streetName: string;
			city: string;
		};
	};
	companyDetails: {
		labels: {
			representativeName: string;
			representativeEmail: string;
			companyName: string;
			companyNumber: string;
			taxNumber: string;
		};
		descriptions: {
			notAddingCompanyNumber: string;
			notAddingTaxNumber: string;
		};
	};
	addresseeDetails: {
		labels: {
			organizationName: string;
			attentionName: string;
			subjectName: string;
		};
	};
	products: {
		table: {
			description: string;
			amount: string;
			tariff: string;
			taxRate: string;
			cost: string;
			subtotal: string;
			taxAmount: string;
			totalIncludingTax: string;
		};
		elements: {
			buttons: {
				newProduct: string;
			};
		};
	};
	paymentDetails: {
		labels: {
			iban: string;
			currency: string;
			invoiceDateAndDueDate: string;
			invoiceNumber: string;
		};
	};
	review: {
		labels: {
			save: string;
			saveAsInvoice: string;
			saveAsPdf: string;
		};
	};
	invoice: {
		invoice: string;
		regarding: string;
		termsAndConditions: string;
		allPricesExcludeVAT: string;
		paymentTerm: string;
		paymentTo: string;
		questionsOrRemarksContact: string;
		companyDetails: {
			companyNumber: string;
			taxNumber: string;
		};
		addresseeDetails: {
			attentionName: string;
			subjectName: string;
		};
		table: {
			description: string;
			amount: string;
			tariff: string;
			taxRate: string;
			cost: string;
			subtotal: string;
			taxAmount: string;
			totalIncludingTax: string;
		};
	};
}
