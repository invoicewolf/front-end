<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import { userSignIn } from "@/utils/login-flow/user-sign-in";
import TextInput from "@/components/TextInput.vue";

defineEmits<{ (e: "step", step: "signIn" | "signUp" | "joinOrCreate" | "companyDetails" | "paymentDetails" | "forgotPassword" | "loading"): void }>();

const model = defineModel<{
	email: string;
	password: string;
}>({ required: true });

const route = useRoute();

const signingIn = ref(false);

const incorrect = ref<boolean>(false);

async function signIn() {
	signingIn.value = true;

	const { email, password } = model.value;

	const err = await userSignIn(email, password, route.query.redirect as string);

	if (err) {
		incorrect.value = true;
	}

	signingIn.value = false;
}
</script>

<template>
	<div class="flex h-full flex-col justify-between gap-4 bg-surface-0 p-10 dark:bg-surface-950">
		<div class="flex flex-col gap-24">
			<div class="flex flex-col gap-4">
				<h1 class="text-4xl font-semibold">
					{{ $t("login.login.signInToYourAccount") }}
				</h1>
				<p class="text-sm">
					{{ $t("login.login.dontHaveAnAccount") }}
					<a class="text-sm text-primary-500 hover:underline" @click="$emit('step', 'signUp')">
						{{ $t("login.login.signUp") }}</a>
				</p>
			</div>

			<div class="flex flex-col gap-4">
				<TextInput
					id="email"
					v-model="model.email"
					:disabled="signingIn"
					:label="$t('login.login.labels.email')"
				/>

				<TextInput
					id="password"
					v-model="model.password"
					:disabled="signingIn"
					:label="$t('login.login.labels.password')" password input-class="w-full"
				/>

				<pv-message v-if="incorrect" icon="pi pi-times-circle" severity="error">
					{{ $t("login.login.messages.emailOrPasswordIncorrect") }}
				</pv-message>

				<div class="flex items-center justify-between">
					<a
						class="text-sm font-medium text-primary-500 hover:underline"
						@click="$emit('step', 'forgotPassword')"
					>{{ $t("login.login.forgotPassword") }}</a>
				</div>

				<pv-button
					:disabled="signingIn"
					:loading="signingIn"
					:label="$t('login.login.buttons.signIn')"
					@click="signIn"
				/>
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
