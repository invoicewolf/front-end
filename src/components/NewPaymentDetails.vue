<script setup lang="ts">
import { reactive } from "vue";
import AdminPaymentDetailsForm from "@/components/Forms/AdminPaymentDetailsForm.vue";
import { BasePaymentDetails } from "@/utils/BasePaymentDetails";
import { createCurrentCompanyPaymentDetails } from "@/utils/client";
import { refreshToken } from "@/utils/helpers/refreshToken";

const emit = defineEmits(["success"]);
const paymentDetails = reactive(new BasePaymentDetails());

async function postCompanyDetails() {
	await refreshToken();

	const res = await createCurrentCompanyPaymentDetails({ body: paymentDetails });

	if (res.data) {
		emit("success");
	}
}
</script>

<template>
	<div class="flex w-full flex-col gap-6">
		<AdminPaymentDetailsForm v-model="paymentDetails" />
		<pv-button
			:label="$t('login.paymentDetails.buttons.createCompany')"
			icon="pi pi-briefcase"
			@click="postCompanyDetails"
		/>
	</div>
</template>

<style scoped>

</style>
