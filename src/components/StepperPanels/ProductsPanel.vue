<script setup lang="ts">
import type { DataTableCellEditCompleteEvent, DataTableRowReorderEvent } from "primevue/datatable";
import { computed, watch } from "vue";
import { useI18n } from "vue-i18n";
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

function deleteProduct(index: number) {
	invoiceManager.invoice.products.splice(index, 1);
}

const i18n = useI18n();

const subtotalValue = computed(() => ([
	{
		id: "subtotal",
		label: i18n.t("products.table.subtotal"),
		value: invoice.price.subtotal,
		bold: false,
	},
	{
		id: "taxAmount",
		label: i18n.t("products.table.taxAmount"),
		value: invoice.price.taxAmount,
		bold: false,
	},
	{
		id: "total",
		label: i18n.t("products.table.totalIncludingTax"),
		value: invoice.price.total,
		bold: true,
	},
]));

function onRowReorder(event: DataTableRowReorderEvent) {
	invoiceManager.invoice.products = event.value;
}
</script>

<template>
	<div class="flex w-full flex-col">
		<pv-toolbar>
			<template #start>
				<pv-button
					:label="$t('products.elements.buttons.newProduct')" icon="pi pi-plus"
					data-cy="newProductButton"
					@click="invoice.addProduct(new Product())"
				/>
			</template>
		</pv-toolbar>
		<pv-data-table
			row-reorder
			:value="invoice.products"
			:pt="{
				column: {
					bodycell: ({ state }: any) => ({
						style: state.d_editing ? 'padding-top: 0; padding-bottom: 0;' : '',
					}),
				},
			}"
			edit-mode="cell"
			@row-reorder="onRowReorder"
			@cell-edit-complete="onCellEditComplete"
		>
			<pv-column row-reorder style="width: 3%" />
			<pv-column
				field="description" :header="$t('products.table.description').toUpperCase()"
				style="width: 47%"
			>
				<template #body="{ data, field, index }">
					<span :data-cy="`${field}-${index}`">{{ data[field] }}</span>
				</template>
				<template #editor="{ data, field, index }">
					<pv-input-text v-model="data[field]" :data-cy="`${field}-editor-${index}`" class="size-full" />
				</template>
			</pv-column>
			<pv-column field="amount" :header="$t('products.table.amount').toUpperCase()" style="width: 10%">
				<template #body="{ data, field, index }">
					<span :data-cy="`${field}-${index}`">{{ data[field] }}</span>
				</template>
				<template #editor="{ data, field, index }">
					<pv-input-number v-model="data[field]" input-class="w-full" :data-cy="`${field}-editor-${index}`" />
				</template>
			</pv-column>
			<pv-column field="tariff" :header="$t('products.table.tariff').toUpperCase()" style="width: 10%">
				<template #body="{ data, field, index }">
					<span :data-cy="`${field}-${index}`">{{ formatCurrencyInvoice(data[field], invoiceManager.invoice.paymentDetails.currency) }}</span>
				</template>
				<template #editor="{ data, field, index }">
					<pv-input-number
						v-model="data[field]"
						:data-cy="`${field}-editor-${index}`"
						mode="currency"
						:currency="invoice.paymentDetails.currency"
						:locale="$t('localeString')"
						input-class="w-full"
					/>
				</template>
			</pv-column>
			<pv-column field="taxRate" :header="$t('products.table.taxRate').toUpperCase()" style="width: 18%">
				<template #body="{ data, field, index }">
					<span :data-cy="`${field}-${index}`">{{ data[field] }}%</span>
				</template>
				<template #editor="{ data, field, index }">
					<pv-input-number
						v-model="data[field]"
						suffix="%"
						input-class="w-full"
						:data-cy="`${field}-editor-${index}`"
					/>
				</template>
			</pv-column>
			<pv-column field="cost" :header="$t('products.table.cost').toUpperCase()" style="width: 6%">
				<template #body="{ data, field, index }">
					<span :data-cy="`${field}-${index}`">{{ formatCurrencyInvoice(data[field], invoiceManager.invoice.paymentDetails.currency) }}</span>
				</template>
			</pv-column>
			<pv-column style="width: 6%">
				<template #body="{ index }">
					<pv-button icon="pi pi-trash" severity="danger" text @click="deleteProduct(index)" />
				</template>
			</pv-column>
		</pv-data-table>
		<pv-data-table
			:value="subtotalValue"
			:pt="{
				headerRow: {
					style: {
						display: 'none',
					},
				},
			}"
		>
			<pv-column field="label" style="text-align: right; width: 88%; border-width: 0 0 0 0; padding-top: 0.25rem; padding-bottom: 0.25rem">
				<template #body="{ data, field }">
					<span v-if="data.bold" class="font-bold">{{ data[field] }}</span>
					<span v-else>{{ data[field] }}</span>
				</template>
			</pv-column>
			<pv-column field="value" style="width: 12%; border-width: 0 0 0 0; padding-top: 0.25rem; padding-bottom: 0.25rem">
				<template #body="{ data, field }">
					<span v-if="data.bold" :data-cy="data.id" class="font-bold">{{ formatCurrencyInvoice(data[field], invoiceManager.invoice.paymentDetails.currency) }}</span>
					<span v-else :data-cy="data.id">{{ formatCurrencyInvoice(data[field], invoiceManager.invoice.paymentDetails.currency) }}</span>
				</template>
			</pv-column>
		</pv-data-table>
	</div>
</template>

<style scoped>

</style>
