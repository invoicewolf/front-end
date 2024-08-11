import { getAuth } from "firebase/auth";

export async function refreshToken() {
	const auth = getAuth();

	if (!auth.currentUser) {
		return;
	}

	const token = await auth.currentUser.getIdToken(true);

	localStorage.setItem("access_token", token);

	return token;
}
