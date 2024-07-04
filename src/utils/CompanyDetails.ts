import { AddressDetails, type IAddressDetails } from "@/utils/AddressDetails";

interface ICompanyDetails extends IAddressDetails {
	representativeName: string;
	representativeEmail: string;
	companyName: string;
	companyNumber?: string;
	taxNumber?: string;
}

export class CompanyDetails extends AddressDetails implements ICompanyDetails {
	representativeName: string = "";
	representativeEmail: string = "";
	companyName: string = "";
	companyNumber?: string = undefined;
	taxNumber?: string = undefined;

	constructor(companyDetails?: ICompanyDetails) {
		super(companyDetails);
		if (companyDetails) {
			this.representativeName = companyDetails.representativeName;
			this.representativeEmail = companyDetails.representativeEmail;
			this.companyName = companyDetails.companyName;
			this.companyNumber = companyDetails.companyNumber;
			this.taxNumber = companyDetails.taxNumber;
			this.streetName = companyDetails.streetName;
			this.houseNumber = companyDetails.houseNumber;
			this.zipCode = companyDetails.zipCode;
			this.city = companyDetails.city;
		}
	}

	reset() {
		this.representativeName = "";
		this.representativeEmail = "";
		this.companyName = "";
		this.companyNumber = undefined;
		this.taxNumber = undefined;
		super.reset();
	}
}
