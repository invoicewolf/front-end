import type { languageInterface } from "@/langs/type";

export const nlNL = {
	localeString: "nl-NL",
	general: {
		menu: {
			invoice: "Factuur",
			new: "Nieuw",
			open: "Openen",
			save: "Opslaan",
			exportToPdf: "Exporteer naar PDF",
			admin: "Administratie",
			profile: "Profiel",
		},
		stepper: {
			step1: "Bedrijfsgegevens",
			step2: "Geadresseerde",
			step3: "Betaalgegevens",
			step4: "Producten",
			step5: "Controle",
			next: "Volgende",
			previous: "Vorige",
		},
		forms: {
			requiredExplanation: "Verplicht",
		},
		currency: "Valuta",
	},
	common: {
		zipCode: "Postcode",
		houseNumber: "Huisnummer",
		addition: "Toevoeging",
		streetName: "Straat",
		city: "Stad",
		country: "Land",
		companyName: "Bedrijfsnaam",
		companyNumber: "KVK-nummer",
		taxNumber: "BTW-nummer",
		organizationName: "Naam organisatie",
		attentionName: "Ter attentie van",
		subjectName: "Onder vermelding van",
		iban: "IBAN nummer",
		currency: "Valuta",
		invoiceDateAndDueDate: "Factuurdatum & einde betalingstermijn",
		invoiceNumber: "Factuurnummer",
		save: "Opslaan",
		saveAsInvoice: "Opslaan als .iw",
		saveAsPdf: "Exporteer naar PDF",
		email: "E-mailadres",
		password: "Wachtwoord",
		firstName: "Voornaam",
		lastName: "Achternaam",
		fullName: "Naam",
		confirmPassword: "Bevestig wachtwoord",
		userId: "Gebruikers-ID",
		currentPassword: "Huidig wachtwoord",
		newPassword: "Nieuw wachtwoord",
		confirmNewPassword: "Bevestig nieuw wachtwoord",
	},
	addressDetails: {
		labels: {
			zipCode: "@:common.zipCode",
			houseNumber: "@:common.houseNumber",
			addition: "@:common.addition",
			streetName: "@:common.streetName",
			city: "@:common.city",
			country: "@:common.country",
		},
		messages: {
			zipCodeNotFound: `De postcode- en huisnummercombinatie is niet gevonden in Nederland. \nVul zelf handmatig de adresgegevens in, of probeer opnieuw.`,
		},
	},
	companyDetails: {
		labels: {
			email: "@:common.email",
			companyName: "@:common.companyName",
			companyNumber: "@:common.companyNumber",
			taxNumber: "@:common.taxNumber",
		},
		descriptions: {
			notAddingCompanyNumber: "Het niet toevoegen van een KVK nummer zorgt voor een niet rechtsgeldige factuur.",
			notAddingTaxNumber: "Het niet toevoegen van een BTW nummer zorgt voor een niet rechtsgeldige factuur.",
		},
	},
	addresseeDetails: {
		labels: {
			organizationName: "@:common.organizationName",
			attentionName: "@:common.attentionName",
			subjectName: "@:common.subjectName",
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
			iban: "@:common.iban",
			currency: "@:common.currency",
			invoiceDateAndDueDate: "@:common.invoiceDateAndDueDate",
			invoiceNumber: "@:common.invoiceNumber",
		},
	},
	export: {
		save: "@:common.save",
		labels: {
			saveAsPdf: "@:common.saveAsPdf",
			saveAsInvoice: "@:common.saveAsInvoice",
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
	login: {
		login: {
			signInToYourAccount: "Log in op uw account",
			labels: {
				email: "@:common.email",
				password: "@:common.password",
			},
			buttons: {
				signIn: "Log in",
			},
			messages: {
				emailOrPasswordIncorrect: "Email en/of wachtwoord is incorrect",
			},
			forgotPassword: "Wachtwoord vergeten?",
			dontHaveAnAccount: "Heeft u geen account?",
			signUp: "Registreer",
		},
		signUp: {
			createNewAccount: "Maak een nieuw account",
			labels: {
				firstName: "@:common.firstName",
				lastName: "@:common.lastName",
				email: "@:common.email",
				password: "@:common.password",
				confirmPassword: "@:common.confirmPassword",
			},
			buttons: {
				signUp: "Registreer",
			},
			messages: {
				passwordsNotMatching: "De wachtwoorden komen niet overeen",
				invalidLogin: "Het e-mailadres is al in gebruik en/of het wachtwoord is korter dan 6 tekens.",
			},
			alreadyHaveAnAccount: "Heeft u al een account?",
			signIn: "Log in",
		},
		forgotPassword: {
			resetPassword: "Wachtwoord herstellen",
			labels: {
				email: "@:common.email",
			},
			buttons: {
				resetPassword: "Herstel wachtwoord",
				backToSignIn: "Terug naar inloggen",
			},
			rememberPassword: "Wachtwoord herinnerd?",
			signIn: "Log in",
		},
		pick: {
			makeAChoice: "Maak een keuze",
			buttons: {
				haveCompany: "Ik heb een bedrijf",
				workForCompany: "Ik werk bij een bedrijf",
			},
		},
		companyDetails: {
			fillInDetails: "Vul uw bedrijfsgegevens in",
			buttons: {
				nextStep: "Volgende stap",
			},
		},
		paymentDetails: {
			fillInDetails: "Vul uw betaalgegevens in",
			buttons: {
				createCompany: "Maak bedrijf",
			},
		},
		dontWantToUseAccount: "Wilt u geen account gebruiken?",
		useFreeVersion: "Gebruik de gratis versie",
		agreeBySignIn: "Met het inloggen gaat u akkoord met onze",
		privacyPolicy: "privacyvoorwaarden",
		toasts: {
			verifyEmail: {
				summary: "Verifiëer e-mailadres",
				detail: "Verifiëer uw e-mailadres met de e-mail in uw inbox",
			},
		},
	},
	home: {
		hello: "Hallo {user}!",
		pressButtonToStart: "Druk op de knop hieronder om een factuur te maken",
		createInvoiceButton: "Maak factuur",
	},
	profile: {
		profile: "Profiel",
		owner: "Eigenaar",
		labels: {
			companyName: "@:common.companyName",
			email: "@:common.email",
			firstName: "@:common.firstName",
			lastName: "@:common.lastName",
			userId: "@:common.userId",
			currentPassword: "@:common.currentPassword",
			newPassword: "@:common.newPassword",
			confirmNewPassword: "@:common.confirmNewPassword",
		},
		buttons: {
			deleteAccount: "Verwijder profiel",
			updateProfile: "Bewerk profiel",
		},
		toast: {
			deleted: {
				summary: "Succesvol",
				detail: "Account succesvol verwijderd",
			},
			updated: {
				summary: "Succesvol",
				detail: "Account succesvol bewerkt",
			},
			updatedEmail: {
				summary: "Informatie",
				detail: "E-mailadres wijziging ingediend. Verifiëer uw e-mailadres in de mailbox van uw nieuwe e-mailadres",
			},
			updatedPassword: {
				summary: "Succesvol",
				detail: "Wachtwoord succesvol bewerkt",
			},
		},
	},
	admin: {
		tabs: {
			companyDetails: "Bedrijfsgegevens",
			paymentDetails: "Betaalgegevens",
			users: "Personen",
		},
		companyDetails: {
			buttons: {
				update: "Bewerk bedrijfsgegevens",
			},
			toasts: {
				updated: {
					summary: "Succesvol",
					detail: "De bedrijfsgegevens zijn succesvol bewerkt",
				},
			},
		},
		paymentDetails: {
			buttons: {
				update: "Bewerk betaalgegevens",
			},
			toasts: {
				updated: {
					summary: "Succesvol",
					detail: "De betaalgegevens zijn succesvol bewerkt",
				},
			},
		},
		users: {
			buttons: {
				cancel: "Annuleren",
				delete: "Verwijder",
				add: "Voeg toe",
			},
			dialogs: {
				removeDialog: {
					header: "Gevaar",
					message: `Weet u zeker dat u {firstName} {lastName} wilt verwijderen?`,
				},
				addUserDialog: {
					header: "Gebruiker toevoegen",
					labels: {
						userId: "@:common.userId",
					},
					descriptions: {
						userId: "Het gebruikers-id is te vinden op de profielpagina",
					},
				},
			},
			table: {
				name: "@:common.fullName",
				email: "@:common.email",
				id: "@:common.userId",
				actions: "Acties",
			},
		},
	},
} satisfies languageInterface;
