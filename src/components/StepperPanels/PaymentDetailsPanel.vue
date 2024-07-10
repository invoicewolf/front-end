<script setup lang="ts">
import { computed, ref, watch } from "vue";
import TextInput from "@/components/TextInput.vue";
import { useInvoiceManager } from "@/composables/invoice-manager";
import vCapitalize from "@/directives/capitalize";
import { validateIban } from "@/utils/helpers/validate-iban";
import { currencies } from "@/utils/typings/currencies";

const invoiceManager = useInvoiceManager();

const validIban = computed(() => {
	return validateIban(invoiceManager.invoice.paymentDetails.iban);
});

const dates = ref([invoiceManager.invoice.paymentDetails.invoiceDate, new Date(new Date().setMonth(invoiceManager.invoice.paymentDetails.invoiceDate.getMonth() + 1))]);

watch(dates, () => {
	invoiceManager.invoice.paymentDetails.invoiceDate = new Date(new Date(dates.value[0]).setUTCHours(0, 0, 0, 0));
	invoiceManager.invoice.paymentDetails.dueDate = new Date(new Date(dates.value[1]).setUTCHours(0, 0, 0, 0));
});
</script>

<template>
	<div class="mb-6 flex flex-col gap-6 sm:w-72">
		<TextInput
			id="iban"
			v-model="invoiceManager.invoice.paymentDetails.iban"
			v-capitalize
			:label="$t('paymentDetails.labels.iban')"
			:invalid="!validIban"
			required
			enable-group
			mask="aa99 aaaa 9999 9999 99?99"
		/>
		<div class="flex flex-col gap-2">
			<label for="currency" class="select-none font-medium">{{ $t("paymentDetails.labels.currency") }}<span
				class="text-danger"
			>*</span></label>
			<pv-select
				id="currency"
				v-model="invoiceManager.invoice.paymentDetails.currency"
				class="w-full"
				:options="currencies"
				placeholder="Select a currency"
			/>
		</div>

		<div class="flex flex-col gap-2">
			<label for="currency" class="select-none font-medium sm:text-nowrap">{{
				$t("paymentDetails.labels.invoiceDateAndDueDate")
			}}<span
				class="text-danger"
			>*</span></label>
			<vue-date-picker
				v-model="dates"
				model-type="iso"
				range
				multi-calendars
				:ui="{
					navBtnNext: ['dp-font'],
					navBtnPrev: ['dp-font'],
					calendar: ['dp-font'],
					calendarCell: ['dp-font'],
					menu: ['dp-font'],
					input: ['dp-font', 'dp-input'],
				}"
				auto-apply
				disable-year-select
				:min-date="new Date()"
				prevent-min-max-navigation
				:enable-time-picker="false"
				:start-date="new Date()"
				hide-input-icon
			>
				<template #clear-icon>
					<i class="pi pi-calendar mr-3" />
				</template>
			</vue-date-picker>
		</div>

		<TextInput
			id="invoiceNumber"
			v-model="invoiceManager.invoice.paymentDetails.invoiceNumber"
			:label="$t('paymentDetails.labels.invoiceNumber')"
			required
		/>
	</div>

	<p class="select-none">
		<span class="text-danger">*</span>{{ $t("general.forms.requiredExplanation") }}
	</p>
</template>

<style>
.dp-font {
    font-weight: 500;
}

.dp-input {
    background-color: var(--pv-form-field-background)
}

.dp__theme_light {
    --dp-font-family: Inter, sans-serif;
    --dp-background-color: var(--pv-content-background);
    --dp-hover-color: var(--pv-form-field-background);
    --dp-text-color: var(--pv-text-color);
    --dp-hover-text-color: var(--pv-text-color);
    --dp-hover-icon-color: var(--pv-text-color);
    --dp-primary-color: var(--pv-primary-color);
    --dp-primary-disabled-color: var(--pv-form-field-disabled-color);
    --dp-primary-text-color: var(--pv-surface-0);
    --dp-border-radius: var(--pv-form-field-border-radius);
    --dp-border-color: var(--pv-form-field-border-color);
    --dp-menu-border-color: var(--pv-form-field-border-color);
    --dp-border-color-hover: var(--pv-form-field-hover-border-color);
    --dp-border-color-focus: var(--pv-form-field-focus-border-color);
    --dp-disabled-color: var(--pv-form-field-disabled-background);
    --dp-success-color: var(--pv-button-text-success-color);
    --dp-icon-color: var(--pv-form-field-icon-color);
    --dp-danger-color: var(--pv-button-text-danger-color);
    --dp-marker-color: var(--pv-button-text-danger-color);
    --dp-range-between-dates-background-color: var(--pv-highlight-background);
    --dp-range-between-dates-text-color: var(--pv-highlight-color);
    --dp-input-padding: calc(var(--pv-form-field-padding-x) / 1.5) calc(var(--pv-form-field-padding-y) * 1.2);
}
</style>
