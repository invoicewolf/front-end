<script setup lang="ts">
import { useInvoiceManager } from "@/composables/invoice-manager";
import { currencies } from "@/utils/typings/currencies";

const invoiceManager = useInvoiceManager();
</script>

<template>
	<pv-select
		v-model="invoiceManager.invoice.paymentDetails.currency"
		class="w-40"
		:options="currencies"
		placeholder="Select a currency"
	>
		<template #value="{ value }">
			{{ $t("general.currency") }}: {{ value }}
		</template>
	</pv-select>
</template>

<style scoped>

</style>
