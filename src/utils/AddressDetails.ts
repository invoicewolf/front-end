export interface IAddressDetails {
	streetName: string;
	houseNumber: string;
	zipCode: string;
	city: string;
	country: string;
}

export class AddressDetails implements IAddressDetails {
	streetName: string = "";
	houseNumber: string = "";
	zipCode: string = "";
	city: string = "";
	country: string = "";

	constructor(addressDetails?: IAddressDetails) {
		if (addressDetails) {
			this.streetName = addressDetails.streetName;
			this.houseNumber = addressDetails.houseNumber;
			this.zipCode = addressDetails.zipCode;
			this.city = addressDetails.city;
			this.country = addressDetails.country;
		}
	}

	reset() {
		this.streetName = "";
		this.houseNumber = "";
		this.zipCode = "";
		this.city = "";
		this.country = "";
	}
}
