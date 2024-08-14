<script setup lang="ts">
import AddressDetails from "@/components/Forms/AddressDetailsForm.vue";
import BaseForm from "@/components/Forms/BaseForm.vue";
import TextInput from "@/components/TextInput.vue";
import type { AddresseeDetails } from "@/utils/AddresseeDetails";

const addresseeDetails = defineModel<AddresseeDetails>({ required: true });

function onAttentionChange(val: string | null) {
	if (val && val.length > 0) {
		addresseeDetails.value.attention = val;
	}
	else {
		addresseeDetails.value.attention = null;
	}
}

function onSubjectChange(val: string | null) {
	if (val && val.length > 0) {
		addresseeDetails.value.subject = val;
	}
	else {
		addresseeDetails.value.subject = null;
	}
}
</script>

<template>
	<BaseForm add-required-explanation>
		<template #form>
			<TextInput
				id="organizationName"
				v-model="addresseeDetails.companyName"
				:label="$t('addresseeDetails.labels.organizationName')"
				required
			/>

			<TextInput
				id="attentionName"
				:model-value="addresseeDetails.attention"
				:label="$t('addresseeDetails.labels.attentionName')"
				@update:model-value="onAttentionChange"
			/>

			<TextInput
				id="subjectName"
				:model-value="addresseeDetails.subject"
				:label="$t('addresseeDetails.labels.subjectName')"
				@update:model-value="onSubjectChange"
			/>

			<AddressDetails v-model="addresseeDetails" />
		</template>
	</BaseForm>
</template>

<style scoped>

</style>
