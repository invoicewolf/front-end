<script setup lang="ts">
import { useToast } from "primevue/usetoast";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import CompanyDetailsForm from "@/components/Forms/CompanyDetailsForm.vue";
import { useCompanyStore } from "@/stores/useCompanyStore";
import { updateCurrentCompany } from "@/utils/client";

const companyStore = useCompanyStore();

if (companyStore.company.id === -1) {
	await companyStore.get();
}
else {
	companyStore.get();
}

const toast = useToast();
const i18n = useI18n();

const updateButtonLoading = ref(false);

const { company } = companyStore;

async function updateCompanyDetails() {
	updateButtonLoading.value = true;

	await updateCurrentCompany({
		body: company,
	});

	toast.add({
		severity: "success",
		summary: i18n.t("admin.companyDetails.toasts.updated.summary"),
		detail: i18n.t("admin.companyDetails.toasts.updated.detail"),
		life: 5000,
	});

	updateButtonLoading.value = false;
}
</script>

<template>
	<div class="flex max-w-sm flex-col gap-6">
		<CompanyDetailsForm v-model="company" />
		<pv-button
			:label="$t('admin.companyDetails.buttons.update')"
			icon="pi pi-sync"
			:loading="updateButtonLoading"
			@click="updateCompanyDetails"
		/>
	</div>
</template>

<style scoped>

</style>
