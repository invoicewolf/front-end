<script setup lang="ts">
import { useToast } from "primevue/usetoast";
import { useI18n } from "vue-i18n";
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
	<div class="flex h-full flex-col justify-between gap-4 bg-surface-0 p-10 dark:bg-surface-950">
		<div class="flex flex-col gap-24">
			<div class="flex flex-col gap-4">
				<h1 class="text-4xl font-semibold">
					{{ $t('login.paymentDetails.fillInDetails') }}
				</h1>
			</div>

			<NewPaymentDetails @success="signInAfterCreation" />
		</div>

		<div class="flex flex-row items-center justify-between">
			<p class="text-sm">
				{{ $t("login.agreeBySignIn") }}
				<a href="https://invoicewolf.net/privacy-policy" class="text-sm text-primary-500 hover:underline">
					{{ $t("login.privacyPolicy") }}
				</a>
			</p>
			<pv-button
				:label="$t('general.stepper.previous')"
				text
				icon="pi pi-arrow-left"
				@click="$emit('step', 'companyDetails')"
			/>
		</div>
	</div>
</template>

<style scoped>

</style>
