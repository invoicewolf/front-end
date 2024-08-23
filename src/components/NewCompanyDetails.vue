<script setup lang="ts">
import { reactive, ref } from "vue";
import SlideTransition from "@/components/Transitions/SlideTransition.vue";
import CompanyDetailsForm from "@/components/Forms/CompanyDetailsForm.vue";
import { createCompany } from "@/utils/client";
import { CompanyDetails } from "@/utils/CompanyDetails";
import { refreshToken } from "@/utils/helpers/refreshToken";

defineProps<{
	part?: "companyDetails" | "addressDetails";
}>();

const emit = defineEmits(["success", "previous"]);
const companyDetails = reactive(new CompanyDetails());

async function postCompanyDetails() {
	await refreshToken();

	const res = await createCompany({ body: companyDetails });

	if (res.data) {
		emit("success");
	}
}

const step = ref<"companyDetails" | "addressDetails">("companyDetails");
</script>

<template>
	<SlideTransition>
		<div v-if="step === 'companyDetails'" class="flex h-full flex-col justify-between">
			<div class="flex w-full flex-col gap-4">
				<CompanyDetailsForm v-model="companyDetails" part="companyDetails" />
				<pv-button
					:label="$t('login.companyDetails.buttons.nextStep')"
					icon="pi pi-arrow-right"
					icon-pos="right"
					@click="step = 'addressDetails'"
				/>
			</div>
			<div class="flex flex-row items-center justify-between">
				<p class="text-sm">
					{{ $t("login.agreeBySignIn") }}
					<a href="https://invoicewolf.net/privacy-policy" class="text-sm text-primary-500 hover:underline">
						{{ $t("login.privacyPolicy") }}
					</a>
				</p>
				<pv-button
					:label="$t('general.stepper.previous')"
					text
					icon="pi pi-arrow-left"
					@click="$emit('previous')"
				/>
			</div>
		</div>
		<div v-else-if="step === 'addressDetails'" class="flex h-full flex-col justify-between">
			<div class="flex w-full flex-col gap-6">
				<CompanyDetailsForm v-model="companyDetails" part="addressDetails" />
				<pv-button
					:label="$t('login.companyDetails.buttons.nextStep')"
					icon="pi pi-arrow-right"
					icon-pos="right"
					@click="postCompanyDetails"
				/>
			</div>
			<div class="flex flex-row items-center justify-between">
				<p class="text-sm">
					{{ $t("login.agreeBySignIn") }}
					<a href="https://invoicewolf.net/privacy-policy" class="text-sm text-primary-500 hover:underline">
						{{ $t("login.privacyPolicy") }}
					</a>
				</p>
				<pv-button
					:label="$t('general.stepper.previous')"
					text
					icon="pi pi-arrow-left"
					@click="step = 'companyDetails'"
				/>
			</div>
		</div>
	</SlideTransition>
</template>

<style scoped>

</style>
