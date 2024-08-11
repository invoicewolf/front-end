import { defineStore } from "pinia";
import { reactive } from "vue";
import { getCurrentUserProfile } from "@/utils/client";
import { Profile } from "@/utils/api/models/Profile";

export const useProfileStore = defineStore("profileStore", () => {
	const profile = reactive(new Profile());

	async function get() {
		const req = await getCurrentUserProfile();

		if (!req.data || req.error) {
			return;
		}

		Object.assign(profile, req.data);
	}

	return { profile, get };
});
