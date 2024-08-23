<script setup lang="ts">
import { ref } from "vue";
import { userSignUp } from "@/utils/login-flow/user-sign-up";
import { validateEmail } from "@/utils/helpers/validate-email";
import TextInput from "@/components/TextInput.vue";
import { debounce } from "@/utils/helpers/debounce";

const emit = defineEmits<{ (e: "step", step: "signIn" | "signUp" | "joinOrCreate" | "companyDetails" | "paymentDetails" | "forgotPassword" | "loading"): void }>();

const model = defineModel<{
	email: string;
	password: string;
	confirmPassword: string;
	firstName: string;
	lastName: string;
}>({ required: true });

const incorrect = ref(false);

const invalidPassword = ref(true);

const handlePasswordValidation = debounce(() => {
	const { password, confirmPassword } = model.value;

	invalidPassword.value = password === confirmPassword;
}, 500);

const signUpPressed = ref(false);

async function signUp() {
	const { email, password, firstName, lastName } = model.value;

	signUpPressed.value = true;

	const err = await userSignUp(email, password, firstName, lastName);

	if (err) {
		signUpPressed.value = false;
		return;
	}

	emit("step", "joinOrCreate");

	signUpPressed.value = false;
}
</script>

<template>
	<div class="flex h-full flex-col justify-between gap-4 bg-surface-0 p-10 dark:bg-surface-950">
		<div class="flex flex-col gap-24">
			<div class="flex flex-col gap-4">
				<h1 class="text-4xl font-semibold">
					{{ $t("login.signUp.createNewAccount") }}
				</h1>
				<p class="text-sm">
					{{ $t("login.signUp.alreadyHaveAnAccount") }}
					<a class="text-sm text-primary-500 hover:underline" @click="$emit('step', 'signIn')">
						{{ $t("login.signUp.signIn") }}</a>
				</p>
			</div>

			<div class="flex flex-col gap-4">
				<div class="grid grid-cols-2 gap-4">
					<TextInput
						id="firstName"
						v-model="model.firstName"
						:label="$t('login.signUp.labels.firstName')"
						:disabled="signUpPressed"
					/>
					<TextInput
						id="lastName"
						v-model="model.lastName"
						:label="$t('login.signUp.labels.lastName')"
						class="text-right"
						:disabled="signUpPressed"
					/>
				</div>

				<TextInput
					id="email"
					v-model="model.email"
					:label="$t('login.signUp.labels.email')" enable-group
					:invalid="!validateEmail(model.email)"
					:disabled="signUpPressed"
				/>

				<TextInput
					id="password" v-model="model.password"
					:label="$t('login.signUp.labels.password')"
					input-class="w-full"
					password
					password-feedback
					:disabled="signUpPressed"
					@update:model-value="handlePasswordValidation"
				/>

				<TextInput
					id="confirmPassword" v-model="model.confirmPassword"
					:label="$t('login.signUp.labels.confirmPassword')"
					input-class="w-full"
					:invalid="!invalidPassword"
					:disabled="signUpPressed"
					password
					@update:model-value="handlePasswordValidation"
				/>

				<pv-message
					v-if="!invalidPassword"
					icon="pi pi-times-circle"
					severity="error"
				>
					{{ $t("login.signUp.messages.passwordsNotMatching") }}
				</pv-message>

				<pv-message
					v-if="incorrect"
					icon="pi pi-times-circle"
					severity="error"
				>
					{{ $t("login.signUp.messages.invalidLogin") }}
				</pv-message>

				<pv-button
					class="w-full"
					:label="$t('login.signUp.buttons.signUp')"
					:disabled="signUpPressed"
					:loading="signUpPressed"
					@click="signUp"
				/>
			</div>
		</div>

		<div class="flex w-full flex-row items-center gap-4">
			<hr class="w-full border-primary-300 dark:border-primary-900">
			<p class="text-primary-300 dark:text-primary-900">
				OR
			</p>
			<hr class="w-full border-primary-300 dark:border-primary-900">
		</div>
		<router-link to="/create-invoice" class="w-full">
			<pv-button class="w-full" :label="$t('login.useFreeVersion')" />
		</router-link>

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
