<script setup lang="ts">
import { onMounted, ref } from "vue";
import TextInput from "@/components/TextInput.vue";
import vCapitalize from "@/directives/capitalize";
import type { AddressDetails } from "@/utils/AddressDetails";
import { getZipCode } from "@/utils/client";
import { debounce } from "@/utils/helpers/debounce";

const { disableFields } = defineProps<{
	disableFields?: boolean;
}>();

const addressDetails = defineModel<AddressDetails>({ required: true });

const disableStreetNameField = ref(true);
const disableCityField = ref(true);
const disableCountryField = ref(true);

async function fetchAddressFromZipCode(zipCode: string, number: string) {
	if (zipCode.length <= 0 || number.length <= 0) {
		return;
	}

	try {
		const req = await getZipCode({
			query: {
				zipCode,
				houseNumber: number,
			},
		});

		if (!req.data) {
			disableStreetNameField.value = false;
			disableCityField.value = false;
			disableCountryField.value = false;

			return;
		}

		disableStreetNameField.value = true;
		disableCityField.value = true;
		disableCountryField.value = true;

		addressDetails.value.city = req.data.city;
		addressDetails.value.streetName = req.data.street;
		addressDetails.value.country = req.data.country;
	}
	catch {
		disableStreetNameField.value = false;
		disableCityField.value = false;
		disableCountryField.value = false;
	}
}

const handleZipFetching = debounce(() => {
	fetchAddressFromZipCode(addressDetails.value.zipCode, addressDetails.value.houseNumber);
}, 500);

onMounted(() => {
	if (
		addressDetails.value.zipCode
		&& addressDetails.value.houseNumber
		&& disableFields
	) {
		fetchAddressFromZipCode(
			addressDetails.value.zipCode,
			addressDetails.value.houseNumber,
		);
	}
});

function onAdditionChange(val: string | null) {
	if (val && val.length > 0) {
		addressDetails.value.addition = val;
	}
	else {
		addressDetails.value.addition = null;
	}
}
</script>

<template>
	<div class="grid grid-cols-2 gap-2">
		<TextInput
			id="zipCode"
			v-model="addressDetails.zipCode"
			v-capitalize
			:disabled="disableFields"
			:label="$t('addressDetails.labels.zipCode')"
			required
			@update:model-value="handleZipFetching"
		/>

		<TextInput
			id="houseNumber"
			v-model="addressDetails.houseNumber"
			class="items-end"
			:disabled="disableFields"
			:label="$t('addressDetails.labels.houseNumber')"
			input-class="w-24"
			required
			@update:model-value="handleZipFetching"
		/>
	</div>

	<TextInput
		id="addition"
		v-model="addressDetails.addition"
		:label="$t('addressDetails.labels.addition')"
		input-class="w-24"
		:disabled="disableFields"
		@update:model-value="onAdditionChange"
	/>

	<pv-message
		v-if="!disableStreetNameField && !disableCountryField"
		severity="warn"
		icon="pi pi-exclamation-triangle"
		class="whitespace-pre text-wrap"
		data-cy="zipCodeNotFoundWarning"
	>
		{{ $t("addressDetails.messages.zipCodeNotFound") }}
	</pv-message>

	<TextInput
		id="streetName"
		v-model="addressDetails.streetName"
		:label="$t('addressDetails.labels.streetName')"
		required
		:disabled="disableStreetNameField || disableFields"
	/>

	<TextInput
		id="city"
		v-model="addressDetails.city"
		:label="$t('addressDetails.labels.city')"
		required
		:disabled="disableCityField || disableFields"
	/>

	<TextInput
		id="country"
		v-model="addressDetails.country"
		:label="$t('addressDetails.labels.country')"
		required
		:disabled="disableCountryField || disableFields"
	/>
</template>

<style scoped>

</style>
