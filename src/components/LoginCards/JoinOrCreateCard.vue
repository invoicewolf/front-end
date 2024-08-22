<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import BaseCard from "@/components/LoginCards/BaseCard.vue";
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
	<BaseCard>
		<template #title>
			{{ $t("login.pick.makeAChoice") }}
		</template>
		<template #content>
			<div class="space-y-4 md:space-y-6">
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
		</template>
	</BaseCard>
</template>

<style scoped>

</style>
