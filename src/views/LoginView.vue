<script lang="ts" setup>
import { reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import SlideTransition from "@/components/Transitions/SlideTransition.vue";
import SignUpCard from "@/components/LoginCards/SignUpCard.vue";
import SignInCard from "@/components/LoginCards/SignInCard.vue";
import WolfIcon from "@/components/Icons/WolfIcon.vue";
import CompanyDetailsCard from "@/components/LoginCards/CompanyDetailsCard.vue";
import JoinOrCreateCard from "@/components/LoginCards/JoinOrCreateCard.vue";
import PaymentDetailsCard from "@/components/LoginCards/PaymentDetailsCard.vue";
import ResetPasswordCard from "@/components/LoginCards/ResetPasswordCard.vue";

const router = useRouter();
const route = useRoute();

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
	<main class="flex flex-1 select-none justify-center overflow-x-hidden bg-gradient-to-t from-primary-100 to-surface-0 dark:from-primary-950 dark:to-surface-950">
		<div v-if="step !== 'loading'" class="w-full backdrop-blur-lg">
			<div class="flex size-full flex-row">
				<div class="relative size-full overflow-hidden bg-surface-0 opacity-40 dark:bg-surface-950">
					<WolfIcon class="absolute fill-primary-100 dark:fill-primary-950" />
				</div>
				<div class="w-full max-w-xl bg-surface-0 dark:bg-surface-950">
					<SlideTransition>
						<div v-if="step === 'signIn'" class="h-full">
							<SignInCard v-model="userData" @step="(newStep) => step = newStep" />
						</div>
						<div v-else-if="step === 'signUp'" class="h-full">
							<SignUpCard v-model="userData" @step="(newStep) => step = newStep" />
						</div>
						<div v-else-if="step === 'forgotPassword'" class="h-full">
							<ResetPasswordCard v-model="userData" @step="(newStep) => step = newStep" />
						</div>
						<div v-else-if="step === 'joinOrCreate'" class="h-full">
							<JoinOrCreateCard v-model="userData" @step="(newStep) => step = newStep" />
						</div>
						<div v-else-if="step === 'companyDetails'" class="h-full">
							<CompanyDetailsCard @step="(newStep) => step = newStep" />
						</div>
						<div v-else-if="step === 'paymentDetails'" class="h-full">
							<PaymentDetailsCard v-model="userData" @step="(newStep) => step = newStep" />
						</div>
					</SlideTransition>
				</div>
			</div>
		</div>

		<div v-if="step === 'loading'" class="w-full backdrop-blur-lg">
			<div class="flex size-full flex-row">
				<div class="relative size-full overflow-hidden bg-surface-0 opacity-40 dark:bg-surface-950">
					<WolfIcon class="absolute fill-primary-100 dark:fill-primary-950" />
				</div>
				<div class="flex w-full max-w-xl items-center bg-surface-0 dark:bg-surface-950">
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
			</div>
		</div>
	</main>
</template>
