import { AddressDetails, type IAddressDetails } from "@/utils/AddressDetails";

interface IAddresseeDetails extends IAddressDetails {
	companyName: string;
	attention: string | null;
	subject: string | null;
}

export class AddresseeDetails extends AddressDetails implements IAddresseeDetails {
	companyName: string = "";
	attention: string | null = null;
	subject: string | null = null;

	constructor(addresseeDetails?: IAddresseeDetails) {
		super(addresseeDetails);
		if (addresseeDetails) {
			this.companyName = addresseeDetails.companyName;
			this.attention = addresseeDetails.attention;
			this.subject = addresseeDetails.subject;
			this.streetName = addresseeDetails.streetName;
			this.houseNumber = addresseeDetails.houseNumber;
			this.zipCode = addresseeDetails.zipCode;
			this.city = addresseeDetails.city;
		}
	}

	reset() {
		this.companyName = "";
		this.attention = null;
		this.subject = null;
		super.reset();
	}
}
