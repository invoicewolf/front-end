import { Company } from "@/utils/api/models/Company";
import { User } from "@/utils/api/models/User";

interface IProfile {
	user: User;
	company: Company;
}

export class Profile implements IProfile {
	user: User = new User();
	company: Company = new Company();

	constructor(profile?: IProfile) {
		if (profile) {
			this.user = new User(profile.user);
			this.company = new Company(profile.company);
		}
	}

	reset() {
		this.user = new User();
		this.company = new Company();
	}
}
