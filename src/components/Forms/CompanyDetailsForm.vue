<script setup lang="ts">
import AddressDetailsForm from "@/components/Forms/AddressDetailsForm.vue";
import BaseForm from "@/components/Forms/BaseForm.vue";
import TextInput from "@/components/TextInput.vue";
import vCapitalize from "@/directives/capitalize";
import type { CompanyDetails } from "@/utils/CompanyDetails";

defineProps<{
	disableFields?: boolean;
}>();

const companyDetails = defineModel<CompanyDetails>({ required: true });

function onCompanyNumberChange(val: string | null) {
	if (val && val.length > 0) {
		companyDetails.value.companyNumber = val;
	}
	else {
		companyDetails.value.companyNumber = null;
	}
}

function onTaxNumberChange(val: string | null) {
	if (val && val.length > 0) {
		companyDetails.value.taxNumber = val;
	}
	else {
		companyDetails.value.taxNumber = null;
	}
}
</script>

<template>
	<BaseForm add-required-explanation>
		<template #form>
			<TextInput
				id="companyName"
				v-model="companyDetails.companyName"
				:label="$t('companyDetails.labels.companyName')"
				required
				:disabled="disableFields"
			/>

			<TextInput
				id="companyEmail"
				v-model="companyDetails.companyEmail"
				:label="$t('companyDetails.labels.email')"
				required
				enable-group
				:invalid="!companyDetails.isValidEmail()"
				:disabled="disableFields"
			/>

			<TextInput
				id="companyNumber"
				:model-value="companyDetails.companyNumber"
				:label="$t('companyDetails.labels.companyNumber')"
				:description="$t('companyDetails.descriptions.notAddingCompanyNumber')"
				:disabled="disableFields"
				@update:model-value="onCompanyNumberChange"
			/>

			<TextInput
				id="taxNumber"
				v-capitalize
				:model-value="companyDetails.taxNumber"
				:label="$t('companyDetails.labels.taxNumber')"
				:description="$t('companyDetails.descriptions.notAddingTaxNumber')"
				:disabled="disableFields"
				@update:model-value="onTaxNumberChange"
			/>

			<AddressDetailsForm v-model="companyDetails" :disable-fields="disableFields" />
		</template>
	</BaseForm>
</template>

<style scoped>

</style>
