<script setup lang="ts">
import * as IBAN from "iban-ts";
import { computed } from "vue";
import type { BasePaymentDetails } from "@/utils/BasePaymentDetails";
import BaseForm from "@/components/Forms/BaseForm.vue";
import TextInput from "@/components/TextInput.vue";
import vCapitalize from "@/directives/capitalize";
import { currencies } from "@/utils/typings/currencies";

const paymentDetails = defineModel<BasePaymentDetails>({ required: true });

const validIban = computed(() => {
	return IBAN.isValid(paymentDetails.value.iban);
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
				/>
			</div>
		</template>
	</BaseForm>
</template>
