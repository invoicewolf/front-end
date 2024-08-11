<script setup lang="ts">
import { onMounted, ref } from "vue";
import PaymentDetailsForm from "@/components/Forms/PaymentDetailsForm.vue";
import { useInvoiceManager } from "@/composables/invoice-manager";
import { usePaymentStore } from "@/stores/usePaymentDetailsStore";
import { PaymentDetails } from "@/utils/PaymentDetails";

const invoiceManager = useInvoiceManager();

const disableIbanField = ref(false);

async function fetchCompanyDetails() {
	const paymentStore = usePaymentStore();

	if (paymentStore.payment.id === -1) {
		await paymentStore.get();
	}

	const alreadySelectedCurrency = invoiceManager.invoice.paymentDetails.currency;

	if (alreadySelectedCurrency === paymentStore.payment.currency) {
		invoiceManager.invoice.paymentDetails = new PaymentDetails({
			...invoiceManager.invoice.paymentDetails,
			...paymentStore.payment,
		});
	}
	else {
		invoiceManager.invoice.paymentDetails = new PaymentDetails({
			...invoiceManager.invoice.paymentDetails,
			...paymentStore.payment,
			currency: alreadySelectedCurrency,
		});
	}

	disableIbanField.value = true;
}

onMounted(() => {
	if (localStorage.getItem("access_token")) {
		fetchCompanyDetails();
	}
});
</script>

<template>
	<div class="max-w-sm">
		<PaymentDetailsForm v-model="invoiceManager.invoice.paymentDetails" :disable-iban-field="disableIbanField" />
	</div>
</template>

<style>

</style>
