<script setup lang="ts">
import { ref } from "vue";
import TextInput from "@/components/TextInput.vue";
import { useInvoiceManager } from "@/composables/invoice-manager";
import vCapitalize from "@/directives/capitalize";

const { addressDetails } = defineProps<{
	addressDetails: "companyDetails" | "addresseeDetails";
}>();

const disableStreetNameField = ref(true);
const disableCountryField = ref(true);

const invoiceManager = useInvoiceManager();

async function fetchAddressFromZipCode(zipCode: string, number: string) {
	if (zipCode.length <= 0 || number.length <= 0) {
		return;
	}

	const res = await fetch(`https://postcode.tech/api/v1/postcode/full?postcode=${zipCode}&number=${number}`, {
		headers: { Authorization: `Bearer ${import.meta.env.VITE_ZIP_CODE_API_KEY}` },
	});

	if (!res.ok) {
		disableStreetNameField.value = false;
		disableCountryField.value = false;

		return;
	}

	const data = await res.json();

	disableStreetNameField.value = true;
	disableCountryField.value = true;

	invoiceManager.invoice[addressDetails].city = data.city;
	invoiceManager.invoice[addressDetails].streetName = data.street;
	invoiceManager.invoice[addressDetails].country = "Nederland";
}

function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
	let timeout: ReturnType<typeof setTimeout> | null;

	return function (...args: Parameters<T>) {
		if (timeout !== null) {
			clearTimeout(timeout);
		}
		timeout = setTimeout(() => {
			timeout = null;
			func(...args);
		}, wait);
	};
}

const handleZipFetching = debounce(() => {
	fetchAddressFromZipCode(invoiceManager.invoice[addressDetails].zipCode, invoiceManager.invoice[addressDetails].houseNumber);
}, 500);
</script>

<template>
	<div class="grid grid-cols-2 gap-2">
		<TextInput
			id="zipCode"
			v-model="invoiceManager.invoice[addressDetails].zipCode"
			v-capitalize
			:label="$t('addressDetails.labels.zipCode')"
			required
			@update:model-value="handleZipFetching"
		/>

		<TextInput
			id="houseNumber"
			v-model="invoiceManager.invoice[addressDetails].houseNumber"
			class="items-end"
			:label="$t('addressDetails.labels.houseNumber')"
			input-class="w-24"
			required
			@update:model-value="handleZipFetching"
		/>
	</div>

	<pv-message
		v-if="!disableStreetNameField && !disableCountryField"
		severity="warn"
		icon="pi pi-exclamation-triangle"
		class="w-[40rem] whitespace-pre"
	>
		{{ $t("addressDetails.messages.zipCodeNotFound") }}
	</pv-message>

	<TextInput
		id="streetName"
		v-model="invoiceManager.invoice[addressDetails].streetName"
		:label="$t('addressDetails.labels.streetName')"
		required
		:disabled="disableStreetNameField"
	/>

	<TextInput
		id="city"
		v-model="invoiceManager.invoice[addressDetails].city"
		:label="$t('addressDetails.labels.city')"
		required
		:disabled="disableCountryField"
	/>
</template>

<style scoped>

</style>
