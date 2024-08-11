import { CompanyDetails, type ICompanyDetails } from "@/utils/CompanyDetails";

interface ICompany extends ICompanyDetails {
	id: number;
}

export class Company extends CompanyDetails implements ICompany {
	id: number = -1;

	constructor(company?: ICompany) {
		super(company);
		if (company) {
			this.id = company.id;
		}
	}

	reset() {
		this.id = -1;
		super.reset();
	}
}
