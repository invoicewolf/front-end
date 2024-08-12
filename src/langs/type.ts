export interface languageInterface {
	localeString: string;
	general: {
		menu: {
			invoice: string;
			new: string;
			open: string;
			save: string;
			exportToPdf: string;
			admin: string;
			profile: string;
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
	common: {
		zipCode: string;
		houseNumber: string;
		addition: string;
		streetName: string;
		city: string;
		country: string;
		companyName: string;
		companyNumber: string;
		taxNumber: string;
		organizationName: string;
		attentionName: string;
		subjectName: string;
		iban: string;
		currency: string;
		invoiceDateAndDueDate: string;
		invoiceNumber: string;
		save: string;
		saveAsInvoice: string;
		saveAsPdf: string;
		email: string;
		password: string;
		firstName: string;
		lastName: string;
		fullName: string;
		confirmPassword: string;
		userId: string;
		currentPassword: string;
		newPassword: string;
		confirmNewPassword: string;
	};
	addressDetails: {
		labels: {
			zipCode: string;
			houseNumber: string;
			addition: string;
			streetName: string;
			city: string;
			country: string;
		};
		messages: {
			zipCodeNotFound: string;
		};
	};
	companyDetails: {
		labels: {
			email: string;
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
	export: {
		save: string;
		labels: {
			saveAsPdf: string;
			saveAsInvoice: string;
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
	login: {
		login: {
			signInToYourAccount: string;
			labels: {
				email: string;
				password: string;
			};
			buttons: {
				signIn: string;
			};
			messages: {
				emailOrPasswordIncorrect: string;
			};
			forgotPassword: string;
			dontHaveAnAccount: string;
			signUp: string;
		};
		signUp: {
			createNewAccount: string;
			labels: {
				firstName: string;
				lastName: string;
				email: string;
				password: string;
				confirmPassword: string;
			};
			buttons: {
				signUp: string;
			};
			messages: {
				passwordsNotMatching: string;
				invalidLogin: string;
			};
			alreadyHaveAnAccount: string;
			signIn: string;
		};
		forgotPassword: {
			resetPassword: string;
			labels: {
				email: string;
			};
			buttons: {
				resetPassword: string;
				backToSignIn: string;
			};
			messages: {
				emailDoesNotExist: string;
			};
			toasts: {
				emailSent: toast;
			};
			rememberPassword: string;
			signIn: string;
		};
		pick: {
			makeAChoice: string;
			buttons: {
				haveCompany: string;
				workForCompany: string;
			};
		};
		companyDetails: {
			fillInDetails: string;
			buttons: {
				nextStep: string;
			};
		};
		paymentDetails: {
			fillInDetails: string;
			buttons: {
				createCompany: string;
			};
		};
		dontWantToUseAccount: string;
		useFreeVersion: string;
		agreeBySignIn: string;
		privacyPolicy: string;
		toasts: {
			verifyEmail: toast;
		};
	};
	home: {
		hello: string;
		pressButtonToStart: string;
		createInvoiceButton: string;
	};
	profile: {
		profile: string;
		owner: string;
		labels: {
			companyName: string;
			email: string;
			firstName: string;
			lastName: string;
			userId: string;
			currentPassword: string;
			newPassword: string;
			confirmNewPassword: string;
		};
		buttons: {
			deleteAccount: string;
			updateProfile: string;
		};
		toast: {
			deleted: toast;
			updated: toast;
			updatedEmail: toast;
			updatedPassword: toast;
		};
	};
	admin: {
		tabs: {
			companyDetails: string;
			paymentDetails: string;
			users: string;
		};
		companyDetails: {
			buttons: {
				update: string;
			};
			toasts: {
				updated: toast;
			};
		};
		paymentDetails: {
			buttons: {
				update: string;
			};
			toasts: {
				updated: toast;
			};
		};
		users: {
			buttons: {
				cancel: string;
				delete: string;
				add: string;
			};
			dialogs: {
				removeDialog: dialog;
				addUserDialog: dialog;
			};
			table: {
				name: string;
				email: string;
				id: string;
				actions: string;
			};
		};
	};
}

interface toast {
	detail: string;
	summary: string;
}

interface dialog {
	header: string;
	[extra: string]: unknown;
}
