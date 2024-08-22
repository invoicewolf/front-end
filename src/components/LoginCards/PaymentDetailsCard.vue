<script setup lang="ts">
import { useToast } from "primevue/usetoast";
import { useI18n } from "vue-i18n";
import BaseCard from "@/components/LoginCards/BaseCard.vue";
import NewPaymentDetails from "@/components/NewPaymentDetails.vue";
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
</script>

<template>
	<BaseCard>
		<template #title>
			{{ $t('login.paymentDetails.fillInDetails') }}
		</template>
		<template #content>
			<NewPaymentDetails @success="signInAfterCreation" />
		</template>
	</BaseCard>
</template>

<style scoped>

</style>
