<script setup lang="ts">
import { useToast } from "primevue/usetoast";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import AdminPaymentDetailsForm from "@/components/Forms/AdminPaymentDetailsForm.vue";
import { usePaymentStore } from "@/stores/usePaymentDetailsStore";
import { updateCurrentCompanyPaymentDetails } from "@/utils/client";

const paymentStore = usePaymentStore();

if (paymentStore.payment.id === -1) {
	await paymentStore.get();
}
else {
	paymentStore.get();
}

const { payment } = paymentStore;

const toast = useToast();
const i18n = useI18n();

const updateButtonLoading = ref(false);

async function updatePaymentDetails() {
	updateButtonLoading.value = true;

	await updateCurrentCompanyPaymentDetails({ body: payment });

	toast.add({
		severity: "success",
		summary: i18n.t("admin.paymentDetails.toasts.updated.summary"),
		detail: i18n.t("admin.paymentDetails.toasts.updated.detail"),
		life: 5000,
	});

	updateButtonLoading.value = false;
}
</script>

<template>
	<div class="flex max-w-sm flex-col gap-6">
		<AdminPaymentDetailsForm v-model="payment" />
		<pv-button
			:label="$t('admin.paymentDetails.buttons.update')"
			icon="pi pi-sync"
			:loading="updateButtonLoading"
			@click="updatePaymentDetails"
		/>
	</div>
</template>

<style scoped>

</style>
