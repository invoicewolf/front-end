<script setup lang="ts">
import AddresseeDetailsForm from "@/components/Forms/AddresseeDetailsForm.vue";
import { useInvoiceManager } from "@/composables/invoice-manager";

const invoiceManager = useInvoiceManager();
</script>

<template>
	<div class="max-w-sm">
		<AddresseeDetailsForm v-model="invoiceManager.invoice.addresseeDetails" />
	</div>
</template>

<style scoped>

</style>
