<script lang="ts" setup>
import { useToast } from "primevue/usetoast";
import { reactive, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";
import PaymentDetailsCard from "@/components/LoginCards/PaymentDetailsCard.vue";
import CompanyDetailsCard from "@/components/LoginCards/CompanyDetailsCard.vue";
import JoinOrCreateCard from "@/components/LoginCards/JoinOrCreateCard.vue";
import ResetPasswordCard from "@/components/LoginCards/ResetPasswordCard.vue";
import SignUpCard from "@/components/LoginCards/SignUpCard.vue";
import SignInCard from "@/components/LoginCards/SignInCard.vue";
import ResizeTransition from "@/components/Transitions/ResizeTransition.vue";

const router = useRouter();
const route = useRoute();

const toast = useToast();
const i18n = useI18n();

const step = ref<"signIn" | "signUp" | "joinOrCreate" | "companyDetails" | "paymentDetails" | "forgotPassword" | "loading">("signIn");

const userData = reactive({
	email: "",
	password: "",
	confirmPassword: "",
	firstName: "",
	lastName: "",
});

const incorrect = ref<boolean>(false);

if (localStorage.getItem("access_token")) {
	router.push((route.query.redirect as string) || "/");
}

watch(() => userData.email, () => (incorrect.value = false));
watch(() => userData.password, () => (incorrect.value = false));
watch(step, () => (incorrect.value = false));
</script>

<template>
	<main class="flex flex-col items-center justify-center">
		<ResizeTransition>
			<div v-if="step === 'signIn'" class="flex flex-col items-center justify-center gap-4 px-6 py-8 lg:py-0">
				<SignInCard v-model="userData" @step="(newStep) => step = newStep" />
			</div>

			<div v-else-if="step === 'signUp'" class="flex flex-col items-center justify-center gap-4 px-6 py-8 lg:py-0">
				<SignUpCard v-model="userData" @step="(newStep) => step = newStep" />
			</div>

			<div
				v-else-if="step === 'forgotPassword'"
				class="flex flex-col items-center justify-center gap-4 px-6 py-8 lg:py-0"
			>
				<ResetPasswordCard v-model="userData" @step="(newStep) => step = newStep" />
			</div>

			<div
				v-else-if="step === 'joinOrCreate'"
				class="flex flex-col items-center justify-center gap-4 px-6 py-8 lg:py-0"
			>
				<JoinOrCreateCard v-model="userData" @step="(newStep) => step = newStep" />
			</div>

			<div
				v-else-if="step === 'companyDetails'"
				class="flex flex-col items-center justify-center gap-4 px-6 py-8 lg:py-0"
			>
				<CompanyDetailsCard @step="(newStep) => step = newStep" />
			</div>

			<div
				v-else-if="step === 'paymentDetails'"
				class="flex flex-col items-center justify-center gap-4 px-6 py-8 lg:py-0"
			>
				<PaymentDetailsCard v-model="userData" />
			</div>

			<div v-else-if="step === 'loading'" class="flex flex-col items-center justify-center gap-4 px-6 py-8 lg:py-0">
				<pv-progress-spinner
					:dt="{
						color: {
							1: 'var(--pv-primary-500)',
							2: 'var(--pv-primary-500)',
							3: 'var(--pv-primary-500)',
							4: 'var(--pv-primary-500)',
						},
					}"
					stroke-width="3"
					style="width: 10rem; height: 10rem"
				/>
			</div>
		</ResizeTransition>
	</main>
</template>
