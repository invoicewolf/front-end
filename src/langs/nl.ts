import type { languageInterface } from "@/langs/type";

export const nl = {
	general: {
		menu: {
			invoice: "Factuur",
			new: "Nieuw",
			open: "Openen",
			save: "Opslaan",
			exportToPdf: "Exporteer naar PDF",
		},
		stepper: {
			step1: "Bedrijfsgegevens",
			step2: "Geadresseerde",
			step3: "Producten",
			step4: "Betaalgegevens",
			step5: "Controle",
			next: "Volgende",
			previous: "Vorige",
		},
		forms: {
			requiredExplanation: "Deze velden zijn verplicht om in te vullen",
		},
		currency: "Valuta",
	},
	addressDetails: {
		labels: {
			zipCode: "Postcode",
			houseNumber: "Huisnummer",
			streetName: "Straat",
			city: "Stad",
		},
		messages: {
			zipCodeNotFound: `De postcode- en huisnummercombinatie is niet gevonden in Nederland. \nVul zelf handmatig de adresgegevens in, of probeer opnieuw.`,
		},
	},
	companyDetails: {
		labels: {
			representativeName: "Bedrijfsvertegenwoordiger",
			representativeEmail: "Email bedrijfsvertegenwoordiger",
			companyName: "Bedrijfsnaam",
			companyNumber: "KVK-nummer",
			taxNumber: "BTW-nummer",
		},
		descriptions: {
			notAddingCompanyNumber: "Het niet toevoegen van een KVK nummer zorgt voor een niet rechtsgeldige factuur.",
			notAddingTaxNumber: "Het niet toevoegen van een BTW nummer zorgt voor een niet rechtsgeldige factuur.",
		},
	},
	addresseeDetails: {
		labels: {
			organizationName: "Naam organisatie",
			attentionName: "Ter attentie van",
			subjectName: "Onder vermelding van",
		},
	},
	products: {
		table: {
			description: "Beschrijving",
			amount: "Aantal",
			tariff: "Tarief",
			taxRate: "BTW%",
			cost: "Bedrag",
			subtotal: "Subtotaal",
			taxAmount: "BTW bedrag",
			totalIncludingTax: "Totaal incl. BTW",
		},
		elements: {
			buttons: {
				newProduct: "Nieuw product",
			},
		},
	},
	paymentDetails: {
		labels: {
			iban: "IBAN nummer",
			currency: "Valuta",
			invoiceDateAndDueDate: "Factuurdatum & einde betalingstermijn",
			invoiceNumber: "Factuurnummer",
		},
	},
	review: {
		labels: {
			save: "Opslaan",
			saveAsInvoice: "Opslaan als .ily",
			saveAsPdf: "Exporteer naar PDF",
		},
	},
	invoice: {
		invoice: "Factuur",
		regarding: "Betreft",
		termsAndConditions: "Voorwaarden",
		allPricesExcludeVAT: "Alle genoemde prijzen zijn exclusief BTW",
		paymentTerm: "De betalingstermijn is binnen {days} dagen na de factuurdatum",
		paymentTo: "Het bedrag dient overgemaakt te worden naar",
		questionsOrRemarksContact: "Wanneer u vragen en/of opmerkingen heeft, kunt u contact opnemen met",
		companyDetails: {
			companyNumber: "KVK",
			taxNumber: "BTW",
		},
		addresseeDetails: {
			attentionName: "T.a.v.",
			subjectName: "O.v.v.",
		},
		table: {
			description: "Beschrijving",
			amount: "Aantal",
			tariff: "Tarief",
			taxRate: "BTW%",
			cost: "Bedrag",
			subtotal: "Subtotaal",
			taxAmount: "BTW bedrag",
			totalIncludingTax: "Totaal incl. BTW",
		},
	},
} satisfies languageInterface;
