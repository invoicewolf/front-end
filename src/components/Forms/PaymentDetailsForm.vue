<script setup lang="ts">
import * as IBAN from "iban-ts";
import { computed, ref, watch } from "vue";
import BaseForm from "@/components/Forms/BaseForm.vue";
import type { PaymentDetails } from "@/utils/PaymentDetails";
import TextInput from "@/components/TextInput.vue";
import vCapitalize from "@/directives/capitalize";
import { currencies } from "@/utils/typings/currencies";

defineProps<{
	disableIbanField?: boolean;
}>();

const paymentDetails = defineModel<PaymentDetails>({ required: true });

const validIban = computed(() => {
	return IBAN.isValid(paymentDetails.value.iban);
});

const dates = ref([paymentDetails.value.invoiceDate, new Date(new Date().setMonth(paymentDetails.value.invoiceDate.getMonth() + 1))]);

watch(dates, () => {
	paymentDetails.value.invoiceDate = new Date(new Date(dates.value[0]).setUTCHours(0, 0, 0, 0));
	paymentDetails.value.dueDate = new Date(new Date(dates.value[1]).setUTCHours(0, 0, 0, 0));
});
</script>

<template>
	<BaseForm add-required-explanation>
		<template #form>
			<TextInput
				id="iban"
				v-model="paymentDetails.iban"
				v-capitalize
				:label="$t('paymentDetails.labels.iban')"
				:invalid="!validIban"
				required
				enable-group
				:disabled="disableIbanField"
			/>
			<div class="flex flex-col gap-2">
				<label for="currency" class="select-none font-medium">{{ $t("paymentDetails.labels.currency") }}<span
					class="text-danger"
				>*</span></label>
				<pv-select
					id="currency"
					v-model="paymentDetails.currency"
					class="w-full"
					:options="currencies"
					placeholder="Select a currency"
					option-value="val"
					option-label="label"
				>
					<template #option="{ option }">
						{{ option.val }} ({{ option.label }})
					</template>
					<template #value="{ value }">
						{{ value }} ({{ currencies.filter(currency => currency.val === value)[0].label }})
					</template>
				</pv-select>
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
				v-model="paymentDetails.invoiceNumber"
				:label="$t('paymentDetails.labels.invoiceNumber')"
				required
			/>
		</template>
	</BaseForm>
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
