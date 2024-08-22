<script setup lang="ts">
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useToast } from "primevue/usetoast";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import BaseCard from "@/components/LoginCards/BaseCard.vue";
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

	if (!userExists.data) {
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
	<BaseCard>
		<template #title>
			{{ $t("login.forgotPassword.resetPassword") }}
		</template>
		<template #content>
			<form class="space-y-4 md:space-y-6">
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

				<p class="text-sm">
					{{ $t("login.forgotPassword.rememberPassword") }}
					<a class="text-sm text-primary-500 hover:underline" @click="$emit('step', 'signIn')">
						{{ $t("login.signUp.signIn") }}</a>
				</p>

				<p class="text-sm">
					{{ $t("login.dontWantToUseAccount") }}
					<router-link to="/create-invoice" class="text-sm text-primary-500 hover:underline">
						{{ $t("login.useFreeVersion") }}
					</router-link>
				</p>
			</form>
		</template>
	</BaseCard>
</template>

<style scoped>

</style>
