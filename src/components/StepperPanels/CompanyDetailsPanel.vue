<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getCurrentCompany } from "@/utils/client";
import CompanyDetailsForm from "@/components/Forms/CompanyDetailsForm.vue";
import { useInvoiceManager } from "@/composables/invoice-manager";
import { useCompanyStore } from "@/stores/useCompanyStore";

const emit = defineEmits(["fetched"]);

const invoiceManager = useInvoiceManager();

const disableAllFields = ref(false);

async function fetchCompanyDetails() {
	const companyStore = useCompanyStore();

	if (companyStore.company.id === -1) {
		await companyStore.get();
	}

	invoiceManager.invoice.companyDetails = companyStore.company;

	disableAllFields.value = true;

	emit("fetched");
}

onMounted(async () => {
	if (localStorage.getItem("access_token") && (await getCurrentCompany()).data) {
		await fetchCompanyDetails();
	}
});
</script>

<template>
	<div class="max-w-sm">
		<CompanyDetailsForm v-model="invoiceManager.invoice.companyDetails" :disable-fields="disableAllFields" />
	</div>
</template>

<style scoped>

</style>
