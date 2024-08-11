// This file is auto-generated by @hey-api/openapi-ts

export const $ZipCodeDto = {
	type: "object",
	properties: {
		street: {
			type: "string",
			default: "Example Street",
		},
		city: {
			type: "string",
			default: "Amsterdam",
		},
		country: {
			type: "string",
			default: "Nederland",
		},
	},
	required: ["street", "city", "country"],
} as const;

export const $CreateUserDto = {
	type: "object",
	properties: {
		firstName: {
			type: "string",
			default: "John",
		},
		lastName: {
			type: "string",
			default: "Doe",
		},
		id: {
			type: "string",
			default: "abcdefghijklmnopqrstuvwxyzaa",
		},
		email: {
			type: "string",
			default: "user@example.com",
		},
	},
	required: ["firstName", "lastName", "id", "email"],
} as const;

export const $UserDto = {
	type: "object",
	properties: {
		firstName: {
			type: "string",
			default: "John",
		},
		lastName: {
			type: "string",
			default: "Doe",
		},
		id: {
			type: "string",
			default: "abcdefghijklmnopqrstuvwxyzaa",
		},
		email: {
			type: "string",
			default: "user@example.com",
		},
	},
	required: ["firstName", "lastName", "id", "email"],
} as const;

export const $UpdateUserDto = {
	type: "object",
	properties: {
		firstName: {
			type: "string",
			default: "John",
		},
		lastName: {
			type: "string",
			default: "Doe",
		},
		email: {
			type: "string",
			default: "user@example.com",
		},
	},
	required: ["firstName", "lastName", "email"],
} as const;

export const $CompanyDto = {
	type: "object",
	properties: {
		id: {
			type: "number",
			default: 0,
		},
		companyEmail: {
			type: "string",
			default: "admin@example.com",
		},
		companyName: {
			type: "string",
			default: "example.com",
		},
		companyNumber: {
			type: "string",
			default: "93056589",
		},
		taxNumber: {
			type: "string",
			default: "NL123456789B01",
		},
		streetName: {
			type: "string",
			default: "Example Street",
		},
		houseNumber: {
			type: "string",
			default: "11",
		},
		addition: {
			type: "string",
			default: "E",
		},
		zipCode: {
			type: "string",
			default: "1234AB",
		},
		city: {
			type: "string",
			default: "Amsterdam",
		},
		country: {
			type: "string",
			default: "The Netherlands",
		},
	},
	required: ["id", "companyEmail", "companyName", "streetName", "houseNumber", "zipCode", "city", "country"],
} as const;

export const $ProfileDto = {
	type: "object",
	properties: {
		user: {
			allOf: [
				{
					$ref: "#/components/schemas/UserDto",
				},
			],
		},
		company: {
			allOf: [
				{
					$ref: "#/components/schemas/CompanyDto",
				},
			],
		},
	},
	required: ["user", "company"],
} as const;

export const $CreateCompanyDto = {
	type: "object",
	properties: {
		companyEmail: {
			type: "string",
			default: "admin@example.com",
		},
		companyName: {
			type: "string",
			default: "example.com",
		},
		companyNumber: {
			type: "string",
			default: "93056589",
		},
		taxNumber: {
			type: "string",
			default: "NL123456789B01",
		},
		streetName: {
			type: "string",
			default: "Example Street",
		},
		houseNumber: {
			type: "string",
			default: "11",
		},
		addition: {
			type: "string",
			default: "E",
		},
		zipCode: {
			type: "string",
			default: "1234AB",
		},
		city: {
			type: "string",
			default: "Amsterdam",
		},
		country: {
			type: "string",
			default: "The Netherlands",
		},
	},
	required: ["companyEmail", "companyName", "streetName", "houseNumber", "zipCode", "city", "country"],
} as const;

export const $UpdateCompanyDto = {
	type: "object",
	properties: {
		companyEmail: {
			type: "string",
			default: "admin@example.com",
		},
		companyName: {
			type: "string",
			default: "example.com",
		},
		companyNumber: {
			type: "string",
			default: "93056589",
		},
		taxNumber: {
			type: "string",
			default: "NL123456789B01",
		},
		streetName: {
			type: "string",
			default: "Example Street",
		},
		houseNumber: {
			type: "string",
			default: "11",
		},
		addition: {
			type: "string",
			default: "E",
		},
		zipCode: {
			type: "string",
			default: "1234AB",
		},
		city: {
			type: "string",
			default: "Amsterdam",
		},
		country: {
			type: "string",
			default: "The Netherlands",
		},
	},
	required: ["companyEmail", "companyName", "streetName", "houseNumber", "zipCode", "city", "country"],
} as const;

export const $CompanyUserDto = {
	type: "object",
	properties: {
		companyId: {
			type: "number",
			default: 0,
		},
		userId: {
			type: "string",
			default: "abcdefghijklmnopqrstuvwxyzaa",
		},
		user: {
			allOf: [
				{
					$ref: "#/components/schemas/UserDto",
				},
			],
		},
	},
	required: ["companyId", "userId", "user"],
} as const;

export const $CreateCompanyUserDto = {
	type: "object",
	properties: {
		userId: {
			type: "string",
			default: "abcdefghijklmnopqrstuvwxyzaa",
		},
	},
	required: ["userId"],
} as const;

export const $PaymentDetailsDto = {
	type: "object",
	properties: {
		id: {
			type: "number",
			default: 0,
		},
		iban: {
			type: "string",
			default: "GB82WEST12345698765432",
		},
		currency: {
			type: "string",
			default: "EUR",
			enum: ["EUR", "USD", "GBP"],
		},
	},
	required: ["id", "iban", "currency"],
} as const;

export const $CreatePaymentDetailsDto = {
	type: "object",
	properties: {
		iban: {
			type: "string",
			default: "GB82WEST12345698765432",
		},
		currency: {
			type: "string",
			default: "EUR",
			enum: ["EUR", "USD", "GBP"],
		},
	},
	required: ["iban", "currency"],
} as const;

export const $UpdatePaymentDetailsDto = {
	type: "object",
	properties: {
		iban: {
			type: "string",
			default: "GB82WEST12345698765432",
		},
		currency: {
			type: "string",
			default: "EUR",
			enum: ["EUR", "USD", "GBP"],
		},
	},
	required: ["iban", "currency"],
} as const;