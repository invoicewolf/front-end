import { validateEmail } from "@/utils/helpers/validate-email";

interface IUser {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
}

export class User implements IUser {
	id: string = "";
	firstName: string = "";
	lastName: string = "";
	email: string = "";

	constructor(user?: IUser) {
		if (user) {
			this.id = user.id;
			this.firstName = user.firstName;
			this.lastName = user.lastName;
			this.email = user.email;
		}
	}

	reset() {
		this.id = "";
		this.firstName = "";
		this.lastName = "";
		this.email = "";
	}

	isValidEmail() {
		return validateEmail(this.email);
	}
}
