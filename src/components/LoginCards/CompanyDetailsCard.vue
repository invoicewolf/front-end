<script setup lang="ts">
import { reactive, ref } from "vue";
import CompanyDetailsForm from "@/components/Forms/CompanyDetailsForm.vue";
import BaseCard from "@/components/LoginCards/BaseCard.vue";
import SlideTransition from "@/components/Transitions/SlideTransition.vue";
import { createCompany } from "@/utils/client";
import { CompanyDetails } from "@/utils/CompanyDetails";
import { refreshToken } from "@/utils/helpers/refreshToken";

const emit = defineEmits<{ (e: "step", step: "signIn" | "signUp" | "joinOrCreate" | "companyDetails" | "paymentDetails" | "forgotPassword" | "loading"): void }>();

const companyDetails = reactive(new CompanyDetails());

async function postCompanyDetails() {
	await refreshToken();

	const res = await createCompany({ body: companyDetails });

	if (res.data) {
		emit("step", "paymentDetails");
	}
}

const step = ref<"companyDetails" | "addressDetails">("companyDetails");
</script>

<template>
	<div class="h-full">
		<SlideTransition>
			<BaseCard v-if="step === 'companyDetails'">
				<template #title>
					{{ $t("login.companyDetails.fillInDetails") }}
				</template>
				<template #content>
					<CompanyDetailsForm v-model="companyDetails" part="companyDetails" />
					<pv-button
						:label="$t('login.companyDetails.buttons.nextStep')"
						icon="pi pi-arrow-right"
						icon-pos="right"
						@click="step = 'addressDetails'"
					/>
				</template>
				<template #previousButton>
					<pv-button
						:label="$t('general.stepper.previous')"
						text
						icon="pi pi-arrow-left"
						@click="$emit('step', 'joinOrCreate')"
					/>
				</template>
			</BaseCard>
			<BaseCard v-if="step === 'addressDetails'">
				<template #title>
					{{ $t("login.companyDetails.fillInDetails") }}
				</template>
				<template #content>
					<CompanyDetailsForm v-model="companyDetails" part="addressDetails" />
					<pv-button
						:label="$t('login.companyDetails.buttons.nextStep')"
						icon="pi pi-arrow-right"
						icon-pos="right"
						@click="postCompanyDetails"
					/>
				</template>
				<template #previousButton>
					<pv-button
						:label="$t('general.stepper.previous')"
						text
						icon="pi pi-arrow-left"
						@click="step = 'companyDetails'"
					/>
				</template>
			</BaseCard>
		</SlideTransition>
	</div>
</template>

<style scoped>

</style>
