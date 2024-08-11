import { defineStore } from "pinia";
import { reactive } from "vue";
import { getCurrentCompanyPaymentDetails } from "@/utils/client";
import { Payment } from "@/utils/api/models/Payment";

export const usePaymentStore = defineStore("paymentStore", () => {
	const payment = reactive(new Payment());

	async function get() {
		const req = await getCurrentCompanyPaymentDetails();

		if (!req.data || req.error) {
			return;
		}

		const paymentObject = new Payment(req.data);

		Object.assign(payment, paymentObject);
	}

	return { payment, get };
});
