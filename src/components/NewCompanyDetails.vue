<script setup lang="ts">
import { reactive } from "vue";
import CompanyDetailsForm from "@/components/Forms/CompanyDetailsForm.vue";
import { createCompany } from "@/utils/client";
import { CompanyDetails } from "@/utils/CompanyDetails";
import { refreshToken } from "@/utils/helpers/refreshToken";

const emit = defineEmits(["success"]);
const companyDetails = reactive(new CompanyDetails());

async function postCompanyDetails() {
	await refreshToken();

	const res = await createCompany({ body: companyDetails });

	if (res.data) {
		emit("success");
	}
}
</script>

<template>
	<div class="flex w-full flex-col gap-6">
		<CompanyDetailsForm v-model="companyDetails" />
		<pv-button
			:label="$t('login.companyDetails.buttons.nextStep')"
			icon="pi pi-arrow-right"
			icon-pos="right"
			@click="postCompanyDetails"
		/>
	</div>
</template>

<style scoped>

</style>
