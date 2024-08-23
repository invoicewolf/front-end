<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import BaseCard from "@/components/LoginCards/BaseCard.vue";
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
	<BaseCard wolf-cub-button>
		<template #title>
			{{ $t("login.login.signInToYourAccount") }}
		</template>
		<template #subtitle>
			{{ $t("login.login.dontHaveAnAccount") }}
			<a class="text-sm text-primary-500 hover:underline" @click="$emit('step', 'signUp')">
				{{ $t("login.login.signUp") }}</a>
		</template>
		<template #content>
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
				:label="$t('login.login.labels.password')"
				password
				input-class="w-full"
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
		</template>
	</BaseCard>
</template>

<style scoped>

</style>
