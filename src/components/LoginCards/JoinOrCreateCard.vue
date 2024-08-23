<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import { userSignIn } from "@/utils/login-flow/user-sign-in";

defineEmits<{ (e: "step", step: "signIn" | "signUp" | "joinOrCreate" | "companyDetails" | "paymentDetails" | "forgotPassword" | "loading"): void }>();

const model = defineModel<{
	email: string;
	password: string;
}>({ required: true });

const route = useRoute();

const incorrect = ref<boolean>(false);

async function signIn() {
	const { email, password } = model.value;

	const err = await userSignIn(email, password, route.query.redirect as string);

	if (err) {
		incorrect.value = true;
	}
}
</script>

<template>
	<div class="flex h-full flex-col justify-between gap-4 bg-surface-0 p-10 dark:bg-surface-950">
		<div class="flex flex-col gap-24">
			<div class="flex flex-col gap-4">
				<h1 class="text-4xl font-semibold">
					{{ $t("login.pick.makeAChoice") }}
				</h1>
			</div>

			<div class="flex flex-col gap-4">
				<pv-button
					:label="$t('login.pick.buttons.haveCompany')" icon="pi pi-briefcase"
					@click="$emit('step', 'companyDetails')"
				/>
				<pv-button
					:label="$t('login.pick.buttons.workForCompany')" icon="pi pi-users"
					@click="signIn"
				/>
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
