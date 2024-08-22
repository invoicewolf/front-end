<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import { userSignIn } from "@/utils/login-flow/user-sign-in";
import BaseCard from "@/components/LoginCards/BaseCard.vue";
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
	<BaseCard :show-loading-bar="signingIn">
		<template #title>
			{{ $t("login.login.signInToYourAccount") }}
		</template>
		<template #content>
			<form class="space-y-4 md:space-y-6">
				<div class="flex flex-col gap-6">
					<TextInput id="email" v-model="model.email" :disabled="signingIn" :label="$t('login.login.labels.email')" />

					<TextInput
						id="password" v-model="model.password" :disabled="signingIn"
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
						:disabled="signingIn" :label="$t('login.login.buttons.signIn')"
						@click="signIn"
					/>

					<p class="text-sm">
						{{ $t("login.login.dontHaveAnAccount") }}
						<a class="text-sm text-primary-500 hover:underline" @click="$emit('step', 'signUp')">
							{{ $t("login.login.signUp") }}</a>
					</p>

					<p class="text-sm">
						{{ $t("login.dontWantToUseAccount") }}
						<router-link to="/create-invoice" class="text-sm text-primary-500 hover:underline">
							{{ $t("login.useFreeVersion") }}
						</router-link>
					</p>

					<p class="text-sm">
						{{ $t("login.agreeBySignIn") }}
						<a href="https://invoicewolf.net/privacy-policy" class="text-sm text-primary-500 hover:underline">
							{{ $t("login.privacyPolicy") }}
						</a>
					</p>
				</div>
			</form>
		</template>
	</BaseCard>
</template>

<style scoped>

</style>
