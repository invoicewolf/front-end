import { defineStore } from "pinia";
import { reactive } from "vue";
import { getCurrentCompany } from "@/utils/client";
import { Company } from "@/utils/api/models/Company";

export const useCompanyStore = defineStore("companyStore", () => {
	const company = reactive(new Company());

	async function get() {
		const req = await getCurrentCompany();

		if (!req.data || req.error) {
			return;
		}

		const companyObject = new Company(req.data);

		Object.assign(company, companyObject);
	}

	return { company, get };
});
