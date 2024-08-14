import type { languageInterface } from "@/langs/type";

export const enGB = {
	localeString: "en-GB",
	general: {
		menu: {
			invoice: "Invoice",
			new: "New",
			open: "Open",
			save: "Save",
			exportToPdf: "Export as PDF",
			admin: "Administration",
			profile: "Profile",
		},
		stepper: {
			step1: "Company details",
			step2: "Addressee details",
			step3: "Payment details",
			step4: "Products",
			step5: "Review",
			next: "Next",
			previous: "Previous",
		},
		forms: {
			requiredExplanation: "Required",
		},
		currency: "Currency",
	},
	common: {
		zipCode: "Zip code",
		houseNumber: "Number",
		addition: "Addition",
		streetName: "Street name",
		city: "City",
		country: "Country",
		companyName: "Company name",
		companyNumber: "Company number",
		taxNumber: "Tax number",
		organizationName: "Organization name",
		attentionName: "Attention name",
		subjectName: "Subject name",
		iban: "Bank number",
		currency: "Currency",
		invoiceDateAndDueDate: "Invoice date & due date",
		invoiceNumber: "Invoice number",
		save: "Save",
		saveAsInvoice: "Save as .iw",
		saveAsPdf: "Export to PDF",
		email: "Email address",
		password: "Password",
		firstName: "First name",
		lastName: "Last name",
		fullName: "Name",
		confirmPassword: "Confirm password",
		userId: "User ID",
		currentPassword: "Current password",
		newPassword: "New password",
		confirmNewPassword: "Confirm new password",
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
			zipCodeNotFound: `The provided zip code and number could not be found in the Netherlands. \nPlease fill in the full address details yourself, or try again.`,
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
			notAddingCompanyNumber: "Not adding a company number makes a legally invalid invoice.",
			notAddingTaxNumber: "Not adding a VAT number makes a legally invalid invoice.",
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
		invoice: "Invoice",
		regarding: "Regarding",
		termsAndConditions: "Terms and conditions",
		allPricesExcludeVAT: "All mentioned prices are without VAT",
		paymentTerm: "The payment term is within {days} days of the invoice date",
		paymentTo: "The payment must be transferred to",
		questionsOrRemarksContact: "If you have any questions and/or remarks, you can contact",
		companyDetails: {
			companyNumber: "Company No.",
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
	login: {
		login: {
			signInToYourAccount: "Sign in to your account",
			labels: {
				email: "@:common.email",
				password: "@:common.password",
			},
			buttons: {
				signIn: "Sign in",
			},
			messages: {
				emailOrPasswordIncorrect: "Email and/or password is incorrect",
			},
			forgotPassword: "Forgot password?",
			dontHaveAnAccount: "Don't have an account?",
			signUp: "Sign up",
		},
		signUp: {
			createNewAccount: "Create a new account",
			labels: {
				firstName: "@:common.firstName",
				lastName: "@:common.lastName",
				email: "@:common.email",
				password: "@:common.password",
				confirmPassword: "@:common.confirmPassword",
			},
			buttons: {
				signUp: "Sign up",
			},
			messages: {
				passwordsNotMatching: "The passwords are not matching",
				invalidLogin: "Email address is already in use and/or the password is fewer than 6 characters",
			},
			alreadyHaveAnAccount: "Already have an account?",
			signIn: "Sign in",
		},
		forgotPassword: {
			resetPassword: "Reset password",
			labels: {
				email: "@:common.email",
			},
			buttons: {
				resetPassword: "Reset password",
				backToSignIn: "Back to sign in",
			},
			messages: {
				emailDoesNotExist: "No user with that email exists",
			},
			toasts: {
				emailSent: {
					summary: "Forgot password",
					detail: "Please change your password using the email in your inbox",
				},
			},
			rememberPassword: "Remembered your password?",
			signIn: "Sign in",
		},
		pick: {
			makeAChoice: "Make a choice",
			buttons: {
				haveCompany: "I have a company",
				workForCompany: "I work for a company",
			},
		},
		companyDetails: {
			fillInDetails: "Fill in your companies' details",
			buttons: {
				nextStep: "Next step",
			},
		},
		paymentDetails: {
			fillInDetails: "Fill in the payment details",
			buttons: {
				createCompany: "Create company",
			},
		},
		dontWantToUseAccount: "Don't want to use an account?",
		useFreeVersion: "Use the WolfCub version",
		agreeBySignIn: "By signing in you agree to our",
		privacyPolicy: "privacy policy",
		toasts: {
			verifyEmail: {
				summary: "Verify email address",
				detail: "Please verify your email address using the email in your inbox",
			},
		},
	},
	home: {
		hello: "Hello {user}!",
		pressButtonToStart: "Press the button below to start the invoice builder",
		createInvoiceButton: "Create invoice",
	},
	profile: {
		profile: "Profile",
		owner: "Owner",
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
			deleteAccount: "Delete profile",
			updateProfile: "Edit profile",
		},
		toast: {
			deleted: {
				summary: "Success",
				detail: "Profile deleted successfully",
			},
			updated: {
				summary: "Success",
				detail: "Profile edited successfully",
			},
			updatedEmail: {
				summary: "Information",
				detail: "Request for email update has been sent. Please verify the new email in the inbox of your new email address.",
			},
			updatedPassword: {
				summary: "Success",
				detail: "Password edited successfully",
			},
		},
	},
	admin: {
		tabs: {
			companyDetails: "Company details",
			paymentDetails: "Payment details",
			users: "Users",
		},
		companyDetails: {
			buttons: {
				update: "Update company details",
			},
			toasts: {
				updated: {
					summary: "Success",
					detail: "Company details updated successfully",
				},
			},
		},
		paymentDetails: {
			buttons: {
				update: "Update payment details",
			},
			toasts: {
				updated: {
					summary: "Success",
					detail: "Payment details updated successfully",
				},
			},
		},
		users: {
			buttons: {
				cancel: "Cancel",
				delete: "Delete",
				add: "Add user",
			},
			dialogs: {
				removeDialog: {
					header: "Danger",
					message: `Are you sure you want to remove {firstName} {lastName} from your company?`,
				},
				addUserDialog: {
					header: "Add user",
					labels: {
						userId: "@:common.userId",
					},
					descriptions: {
						userId: "The user ID can be found on the profile page",
					},
				},
			},
			table: {
				name: "@:common.fullName",
				email: "@:common.email",
				id: "@:common.userId",
				actions: "Actions",
			},
		},
	},
} satisfies languageInterface;
