import { createUserWithEmailAndPassword, deleteUser, getAuth, sendEmailVerification } from "firebase/auth";
import { createUser } from "@/utils/client";
import { refreshToken } from "@/utils/helpers/refreshToken";

const auth = getAuth();

export async function userSignUp(email: string, password: string, firstName: string, lastName: string) {
	try {
		const user = await createUserWithEmailAndPassword(auth, email, password);

		const token = await user.user.getIdToken();

		localStorage.setItem("access_token", token);

		if (!auth.currentUser) {
			throw new Error("Something went wrong");
		}

		await createUser({
			body: {
				firstName,
				lastName,
				email,
				id: auth.currentUser.uid,
			},
		});

		await refreshToken();

		await sendEmailVerification(auth.currentUser);
	}
	catch (error) {
		console.error("API Error:", error);

		if (auth.currentUser) {
			await deleteUser(auth.currentUser);
		}

		return error;
	}
}
