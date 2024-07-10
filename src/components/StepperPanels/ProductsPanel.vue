<script setup lang="ts">
import type { DataTableCellEditCompleteEvent } from "primevue/datatable";
import { watch } from "vue";
import { useInvoiceManager } from "@/composables/invoice-manager";
import { formatCurrencyInvoice } from "@/utils/helpers/format-currency-invoice";
import { Product } from "@/utils/Product";

const invoiceManager = useInvoiceManager();

const invoice = invoiceManager.invoice;

watch(invoice, () => {
	invoice.products.forEach((product) => {
		product.calculateCost();
	});

	invoice.calculatePrice();
});

function onCellEditComplete(event: DataTableCellEditCompleteEvent) {
	const { data, newValue, field } = event;

	switch (field) {
		case "description":
		case "amount":
		case "tariff":
		case "taxRate":
			data[field] = newValue;
			break;

		default:
			break;
	}
}
</script>

<template>
	<div class="flex w-full flex-col">
		<pv-toolbar>
			<template #start>
				<pv-button
					:label="$t('products.elements.buttons.newProduct')" icon="pi pi-plus"
					@click="invoice.addProduct(new Product())"
				/>
			</template>
		</pv-toolbar>
		<pv-data-table
			:value="invoice.products"
			:pt="{
				table: { style: 'min-width: 50rem' },
				column: {
					bodycell: ({ state }: any) => ({
						style: state.d_editing ? 'padding-top: 0; padding-bottom: 0;' : '',
					}),
				},
			}"

			edit-mode="cell"
			@cell-edit-complete="onCellEditComplete"
		>
			<pv-column
				field="description" :header="$t('products.table.description').toUpperCase()"
				style="width: 30%"
			>
				<template #body="{ data, field }">
					{{ data[field] }}
				</template>
				<template #editor="{ data, field }">
					<pv-input-text v-model="data[field]" class="w-full" />
				</template>
			</pv-column>
			<pv-column field="amount" :header="$t('products.table.amount').toUpperCase()" style="width: 10%">
				<template #body="{ data, field }">
					{{ data[field] }}
				</template>
				<template #editor="{ data, field }">
					<pv-input-number v-model="data[field]" input-class="w-full" />
				</template>
			</pv-column>
			<pv-column field="tariff" :header="$t('products.table.tariff').toUpperCase()" style="width: 10%">
				<template #body="{ data, field }">
					{{ formatCurrencyInvoice(data[field]) }}
				</template>
				<template #editor="{ data, field }">
					<pv-input-number
						v-model="data[field]"
						mode="currency"
						currency="EUR"
						locale="nl"
						input-class="w-full"
					/>
				</template>
			</pv-column>
			<pv-column field="taxRate" :header="$t('products.table.taxRate').toUpperCase()" style="width: 40%">
				<template #body="{ data, field }">
					{{ data[field] }}%
				</template>
				<template #editor="{ data, field }">
					<pv-input-number v-model="data[field]" suffix="%" input-class="w-full" />
				</template>
			</pv-column>
			<pv-column field="cost" :header="$t('products.table.cost').toUpperCase()" style="width: 10%">
				<template #body="{ data, field }">
					{{ formatCurrencyInvoice(data[field]) }}
				</template>
			</pv-column>
		</pv-data-table>

		<div class="flex w-full place-content-end bg-surface-0 p-4 dark:bg-surface-900">
			<div class="grid select-none grid-cols-3 gap-2">
				<p class=" text-right">
					{{ $t("products.table.subtotal") }}
				</p>
				<p>{{ invoiceManager.invoice.paymentDetails.currency }}</p>
				<p>{{ formatCurrencyInvoice(invoice.price.subtotal) }}</p>

				<p class=" text-right">
					{{ $t("products.table.taxAmount") }}
				</p>
				<p>{{ invoiceManager.invoice.paymentDetails.currency }}</p>
				<p>{{ formatCurrencyInvoice(invoice.price.taxAmount) }}</p>

				<p class="text-right font-bold">
					{{ $t("products.table.totalIncludingTax") }}
				</p>
				<p class="font-bold">
					{{ invoiceManager.invoice.paymentDetails.currency }}
				</p>
				<p class="font-bold">
					{{ formatCurrencyInvoice(invoice.price.total) }}
				</p>
			</div>
		</div>
	</div>
</template>

<style scoped>

</style>
