<script setup lang="ts">
import { computed } from "vue";
import AddressDetails from "@/components/AddressDetails.vue";
import TextInput from "@/components/TextInput.vue";
import { useInvoiceManager } from "@/composables/invoice-manager";

const invoiceManager = useInvoiceManager();

function onCompanyNumberChange(val: string) {
	if (val.length > 0) {
		invoiceManager.invoice.companyDetails.companyNumber = val;
	}
	else {
		invoiceManager.invoice.companyDetails.companyNumber = undefined;
	}
}

function onTaxNumberChange(val: string) {
	if (val.length > 0) {
		invoiceManager.invoice.companyDetails.taxNumber = val;
	}
	else {
		invoiceManager.invoice.companyDetails.taxNumber = undefined;
	}
}

const isValidCompanyNumber = computed(() => {
	return !(
		!!invoiceManager.invoice.companyDetails.companyNumber
		&& invoiceManager.invoice.companyDetails.companyNumber.length === 8

	);
});

const isValidTaxNumber = computed(() => {
	return !(
		!!invoiceManager.invoice.companyDetails.taxNumber
		&& invoiceManager.invoice.companyDetails.taxNumber.length === 14
	);
});
</script>

<template>
	<div class="mb-6 flex flex-col gap-6 sm:w-72">
		<TextInput
			id="representativeName"
			v-model="invoiceManager.invoice.companyDetails.representativeName"
			:label="$t('companyDetails.labels.representativeName')"
			required
		/>

		<TextInput
			id="representativeEmail"
			v-model="invoiceManager.invoice.companyDetails.representativeEmail"
			:label="$t('companyDetails.labels.representativeEmail')"
			required
		/>

		<TextInput
			id="companyName"
			v-model="invoiceManager.invoice.companyDetails.companyName"
			:label="$t('companyDetails.labels.companyName')"
			required
		/>

		<TextInput
			id="companyNumber"
			:model-value="invoiceManager.invoice.companyDetails.companyNumber"
			:label="$t('companyDetails.labels.companyNumber')"
			:description="$t('companyDetails.descriptions.notAddingCompanyNumber')"
			enable-group
			mask="99999999"
			:invalid="isValidCompanyNumber"
			@update:model-value="onCompanyNumberChange"
		/>

		<TextInput
			id="taxnumber"
			:model-value="invoiceManager.invoice.companyDetails.taxNumber"
			:label="$t('companyDetails.labels.taxNumber')"
			:description="$t('companyDetails.descriptions.notAddingTaxNumber')"
			enable-group
			mask="aa999999999a99"
			:invalid="isValidTaxNumber"
			@update:model-value="onTaxNumberChange"
		/>

		<AddressDetails address-details="companyDetails" />
	</div>

	<p>
		<span class="text-danger">*</span>{{ $t("general.forms.requiredExplanation") }}
	</p>
</template>

<style scoped>

</style>
