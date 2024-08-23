<script setup lang="ts">
import { useToast } from "primevue/usetoast";
import { reactive } from "vue";
import { useI18n } from "vue-i18n";
import AdminPaymentDetailsForm from "@/components/Forms/AdminPaymentDetailsForm.vue";
import BaseCard from "@/components/LoginCards/BaseCard.vue";
import { BasePaymentDetails } from "@/utils/BasePaymentDetails";
import { createCurrentCompanyPaymentDetails } from "@/utils/client";
import { refreshToken } from "@/utils/helpers/refreshToken";
import { sleep } from "@/utils/helpers/sleep";
import { userSignIn } from "@/utils/login-flow/user-sign-in";

const emit = defineEmits<{ (e: "step", step: "signIn" | "signUp" | "joinOrCreate" | "companyDetails" | "paymentDetails" | "forgotPassword" | "loading"): void }>();

const model = defineModel<{
	email: string;
	password: string;
}>({ required: true });

const toast = useToast();
const i18n = useI18n();

async function signInAfterCreation() {
	await sleep(1000);

	emit("step", "loading");

	const { email, password } = model.value;

	const err = await userSignIn(email, password);

	if (err) {
		emit("step", "signUp");
	}

	toast.add({
		summary: i18n.t("login.toasts.verifyEmail.summary"),
		detail: i18n.t("login.toasts.verifyEmail.detail"),
		severity: "info",
		group: "br",
	});
}

const paymentDetails = reactive(new BasePaymentDetails());

async function postCompanyDetails() {
	await refreshToken();

	const res = await createCurrentCompanyPaymentDetails({ body: paymentDetails });

	if (res.data) {
		await signInAfterCreation();
	}
}
</script>

<template>
	<BaseCard>
		<template #title>
			{{ $t('login.paymentDetails.fillInDetails') }}
		</template>
		<template #content>
			<AdminPaymentDetailsForm v-model="paymentDetails" />
			<pv-button
				:label="$t('login.paymentDetails.buttons.createCompany')"
				icon="pi pi-briefcase"
				@click="postCompanyDetails"
			/>
		</template>
		<template #previousButton>
			<pv-button
				:label="$t('general.stepper.previous')"
				text
				icon="pi pi-arrow-left"
				@click="$emit('step', 'companyDetails')"
			/>
		</template>
	</BaseCard>
</template>

<style scoped>

</style>
