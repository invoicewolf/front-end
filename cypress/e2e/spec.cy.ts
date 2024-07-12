describe("template spec", () => {
	beforeEach(() => {
		cy.visit("http://localhost:5173");
	});
	it("loads", () => {

	});

	it("should not enable the next button when the email is invalid", () => {
		cy.get("[data-cy='representativeName']").type("John Doe");
		cy.get("[data-cy='representativeEmail']").type("JohnDoe@example");
		cy.get("[data-cy='companyName']").type("example.com");
		cy.get("[data-cy='companyNumber']").type("93056589");
		cy.get("[data-cy='taxNumber']").type("nl123456789b01");

		cy.intercept("GET", "https://postcode.tech/api/v1/postcode/full?postcode=1234AB&number=1", {
			statusCode: 200,
			fixture: "zipCode.json",
		});

		cy.get("[data-cy='zipCode']").type("1234AB");
		cy.get("[data-cy='houseNumber']").type("1");

		cy.get("[data-cy='nextButton']").should("be.disabled");
	});

	it("should be in english", () => {
		cy.get("[data-cy='languageSelector']").click().then(() => {
			cy.get("[data-cy='option-nl']").click();
		});
	});

	it("should enable the manual address details when the ZIP code is invalid", () => {
		cy.get("[data-cy='representativeName']").type("John Doe");
		cy.get("[data-cy='representativeEmail']").type("JohnDoe@example.com");
		cy.get("[data-cy='companyName']").type("example.com");
		cy.get("[data-cy='companyNumber']").type("93056589");
		cy.get("[data-cy='taxNumber']").type("nl123456789b01");

		cy.intercept("GET", "https://postcode.tech/api/v1/postcode/full?postcode=1234AB&number=1", {
			statusCode: 404,
		});

		cy.get("[data-cy='zipCode']").type("1234AB");
		cy.get("[data-cy='houseNumber']").type("1");

		// Check whether fields are disabled at first
		cy.get("[data-cy='streetName']").as("streetName");
		cy.get("@streetName").should("not.be.enabled");

		cy.get("[data-cy='city']").as("city");
		cy.get("@city").should("not.be.enabled");

		cy.get("[data-cy='country']").as("country");
		cy.get("@country").should("not.be.enabled");

		cy.get("[data-cy='zipCodeNotFoundWarning']").as("zipCodeNotFoundWarning");
		cy.get("@zipCodeNotFoundWarning").should("not.be.visible");

		// Wait for popup to appear
		cy.wait(1200);

		// Check whether fields are enabled
		cy.get("@zipCodeNotFoundWarning").should("be.visible");
		cy.get("@streetName").should("be.enabled");
		cy.get("@city").should("be.enabled");
		cy.get("@country").should("be.enabled");

		// Next button should be disabled
		cy.get("[data-cy='nextButton']").should("be.disabled");

		cy.get("@streetName").type("Placeholder street");
		cy.get("@city").type("Placeholder city");
		cy.get("@country").type("Placeholder country");

		cy.get("[data-cy='nextButton']").should("not.be.disabled");
	});

	it("should make it through the entire application", () => {
		cy.get("[data-cy='representativeName']").type("John Doe");
		cy.get("[data-cy='representativeEmail']").type("JohnDoe@example.com");
		cy.get("[data-cy='companyName']").type("example.com");
		cy.get("[data-cy='companyNumber']").type("93056589");
		cy.get("[data-cy='taxNumber']").type("nl123456789b01");

		cy.intercept("GET", "https://postcode.tech/api/v1/postcode/full?postcode=1234AB&number=1", {
			statusCode: 200,
			fixture: "zipCode.json",
		});

		cy.get("[data-cy='zipCode']").type("1234AB");
		cy.get("[data-cy='houseNumber']").type("1");

		cy.get("[data-cy='nextButton']").click();

		cy.get("[data-cy='organizationName']").type("Example corp.");

		cy.get("[data-cy='zipCode']").type("1234AB");
		cy.get("[data-cy='houseNumber']").type("1");

		cy.get("[data-cy='nextButton']").click();

		cy.get("[data-cy='newProductButton']").click();

		cy.get("[data-cy='description-0']").click({ force: true });
		cy.get("[data-cy='description-editor-0']").type("Test product{enter}");

		cy.get("[data-cy='amount-0']").click({ force: true });
		cy.get("[data-cy='amount-editor-0']").type("2{enter}");

		cy.get("[data-cy='tariff-0']").click({ force: true });
		cy.get("[data-cy='tariff-editor-0']").type("{backspace}{backspace}{backspace}{backspace}50{enter}");

		cy.get("[data-cy='taxRate-0']").click({ force: true });
		cy.get("[data-cy='taxRate-editor-0']").type("{backspace}21{enter}");

		cy.get("[data-cy='subtotal']").should("have.text", "100,-");
		cy.get("[data-cy='taxAmount']").should("have.text", "21,-");
		cy.get("[data-cy='total']").should("have.text", "121,-");

		cy.get("[data-cy='nextButton']").click();

		cy.get("[data-cy='iban']").type("NL35INGB028362888848");
		cy.get("[data-cy='invoiceNumber']").type("00001");

		cy.get("[data-cy='nextButton']").click();

		cy.get("[data-cy='saveAsPdf']").click();
	});
});
