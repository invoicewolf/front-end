import { AddressDetails, type IAddressDetails } from "@/utils/AddressDetails";
import { validateEmail } from "@/utils/helpers/validate-email";

export interface ICompanyDetails extends IAddressDetails {
	companyEmail: string;
	companyName: string;
	companyNumber?: string;
	taxNumber?: string;
}

export class CompanyDetails extends AddressDetails implements ICompanyDetails {
	companyEmail: string = "";
	companyName: string = "";
	companyNumber?: string = undefined;
	taxNumber?: string = undefined;

	constructor(companyDetails?: ICompanyDetails) {
		super(companyDetails);
		if (companyDetails) {
			this.companyEmail = companyDetails.companyEmail;
			this.companyName = companyDetails.companyName;
			this.companyNumber = companyDetails.companyNumber;
			this.taxNumber = companyDetails.taxNumber;
			this.addition = companyDetails.addition;
			this.streetName = companyDetails.streetName;
			this.houseNumber = companyDetails.houseNumber;
			this.zipCode = companyDetails.zipCode;
			this.city = companyDetails.city;
		}
	}

	reset() {
		this.companyEmail = "";
		this.companyName = "";
		this.companyNumber = undefined;
		this.taxNumber = undefined;
		super.reset();
	}

	isValidEmail() {
		return validateEmail(this.companyEmail);
	}
}
