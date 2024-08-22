import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { router } from "@/router";
import { useCompanyStore } from "@/stores/useCompanyStore";
import { usePaymentStore } from "@/stores/usePaymentDetailsStore";
import { useProfileStore } from "@/stores/useProfileStore";

const auth = getAuth();

const profileStore = useProfileStore();
const companyStore = useCompanyStore();
const paymentStore = usePaymentStore();

export async function userSignIn(email: string, password: string, route: string = "/") {
	try {
		localStorage.removeItem("access_token");

		const userCredential = await (await signInWithEmailAndPassword(auth, email, password)).user.getIdToken();

		localStorage.setItem("access_token", userCredential);

		await Promise.all([profileStore.get(), companyStore.get(), paymentStore.get()]);

		await router.push(route);
	}
	catch (error) {
		console.error("API Error:", error);

		localStorage.removeItem("access_token");

		return error;
	}
}
