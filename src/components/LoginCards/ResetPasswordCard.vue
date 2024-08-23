<script setup lang="ts">
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useToast } from "primevue/usetoast";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import TextInput from "@/components/TextInput.vue";
import { getUserExistsByEmail } from "@/utils/client";
import { sleep } from "@/utils/helpers/sleep";

defineEmits<{ (e: "step", step: "signIn" | "signUp" | "joinOrCreate" | "companyDetails" | "paymentDetails" | "forgotPassword" | "loading"): void }>();

const model = defineModel<{
	email: string;
}>({ required: true });

const i18n = useI18n();
const toast = useToast();

const disableForgotPasswordButton = ref(false);
const passwordEmailSent = ref(false);
const userNotFound = ref(false);

const auth = getAuth();

async function forgotPassword() {
	disableForgotPasswordButton.value = true;
	userNotFound.value = false;

	const { email } = model.value;

	const userExists = await getUserExistsByEmail({ path: { email } });

	if (String(userExists.data) === "false") {
		disableForgotPasswordButton.value = false;

		return userNotFound.value = true;
	}

	await sendPasswordResetEmail(auth, email);

	await sleep(2000);

	toast.add({
		summary: i18n.t("login.forgotPassword.toasts.emailSent.summary"),
		detail: i18n.t("login.forgotPassword.toasts.emailSent.detail"),
		severity: "info",
		life: 5000,
	});

	passwordEmailSent.value = true;
}
</script>

<template>
	<div class="flex h-full flex-col justify-between gap-4 bg-surface-0 p-10 dark:bg-surface-950">
		<div class="flex flex-col gap-24">
			<div class="flex flex-col gap-4">
				<h1 class="text-4xl font-semibold">
					{{ $t("login.forgotPassword.resetPassword") }}
				</h1>
				<p class="text-sm">
					{{ $t("login.forgotPassword.rememberPassword") }}
					<a class="text-sm text-primary-500 hover:underline" @click="$emit('step', 'signIn')">
						{{ $t("login.signUp.signIn") }}</a>
				</p>
			</div>

			<div class="flex flex-col gap-4">
				<TextInput id="email" v-model="model.email" :label="$t('login.forgotPassword.labels.email')" />

				<pv-button
					v-if="!passwordEmailSent"
					class="w-full"
					:label="$t('login.forgotPassword.buttons.resetPassword')"
					:disabled="disableForgotPasswordButton"
					:loading="disableForgotPasswordButton"
					@click="forgotPassword"
				/>

				<pv-button
					v-else
					class="w-full"
					:label="$t('login.forgotPassword.buttons.backToSignIn')"
					@click="$emit('step', 'signIn'); passwordEmailSent = false; disableForgotPasswordButton = false;"
				/>

				<pv-message v-if="userNotFound" icon="pi pi-times-circle" severity="error">
					{{ $t("login.forgotPassword.messages.emailDoesNotExist") }}
				</pv-message>
			</div>
		</div>

		<div class="flex flex-col gap-4">
			<p class="text-sm">
				{{ $t("login.agreeBySignIn") }}
				<a href="https://invoicewolf.net/privacy-policy" class="text-sm text-primary-500 hover:underline">
					{{ $t("login.privacyPolicy") }}
				</a>
			</p>
		</div>
	</div>
</template>

<style scoped>

</style>
