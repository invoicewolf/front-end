<script setup lang="ts">
import AddressDetails from "@/components/AddressDetails.vue";
import TextInput from "@/components/TextInput.vue";
import { useInvoiceManager } from "@/composables/invoice-manager";

const invoiceManager = useInvoiceManager();

function onAttentionChange(val: string) {
	if (val.length > 0) {
		invoiceManager.invoice.addresseeDetails.attention = val;
	}
	else {
		invoiceManager.invoice.addresseeDetails.attention = undefined;
	}
}

function onSubjectChange(val: string) {
	if (val.length > 0) {
		invoiceManager.invoice.addresseeDetails.subject = val;
	}
	else {
		invoiceManager.invoice.addresseeDetails.subject = undefined;
	}
}
</script>

<template>
	<div class="mb-6 flex flex-col gap-6 sm:w-72">
		<TextInput
			id="organizationName"
			v-model="invoiceManager.invoice.addresseeDetails.companyName"
			:label="$t('addresseeDetails.labels.organizationName')"
			required
		/>

		<TextInput
			id="attentionName"
			:model-value="invoiceManager.invoice.addresseeDetails.attention"
			:label="$t('addresseeDetails.labels.attentionName')"
			@update:model-value="onAttentionChange"
		/>

		<TextInput
			id="subjectName"
			:model-value="invoiceManager.invoice.addresseeDetails.subject"
			:label="$t('addresseeDetails.labels.subjectName')"
			@update:model-value="onSubjectChange"
		/>

		<AddressDetails address-details="addresseeDetails" />
	</div>

	<p>
		<span class="text-danger">*</span>{{ $t("general.forms.requiredExplanation") }}
	</p>
</template>

<style scoped>

</style>
