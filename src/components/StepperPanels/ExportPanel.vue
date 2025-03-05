<script setup lang="ts">
import { VuePDF, usePDF } from "@tato30/vue-pdf";
import { useI18n } from "vue-i18n";
import { useInvoiceManager } from "@/composables/invoice-manager";
import { type InvoiceDto, createInvoice, type language } from "@/utils/client";

defineEmits<{
	(e: "saveFile", blob: Blob, filename: string): void;
}>();

const invoiceManager = useInvoiceManager();
const i18n = useI18n();

const invoice: InvoiceDto = { ...invoiceManager.invoice, language: i18n.t("localeString") as language };

const generatedPdf = await createInvoice({ body: invoice });
const iwFile = new Blob([JSON.stringify(invoice)], { type: "application/pdf" });

const { pdf } = usePDF({
	data: await (generatedPdf.data as Blob).arrayBuffer(),
});
</script>

<template>
	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
		<div class="w-full">
			<VuePDF fit-parent :pdf="pdf" class="drop-shadow" />
		</div>
		<div class="flex w-56 flex-col gap-4">
			<h1 class="text select-none text-4xl font-medium">
				{{ $t("export.save") }}
			</h1>

			<pv-button
				:label="$t('export.labels.saveAsPdf')"
				icon="pi pi-download"
				data-cy="saveAsPdf"
				@click="$emit('saveFile', generatedPdf.data as Blob, `invoice_${invoice.paymentDetails.invoiceNumber}.pdf`)"
			/>
			<pv-button
				:label="$t('export.labels.saveAsInvoice')"
				icon="pi pi-save"
				data-cy="saveAsIw"
				@click="$emit('saveFile', iwFile, `invoice_${invoice.paymentDetails.invoiceNumber}.iw`)"
			/>
		</div>
	</div>
</template>

<style scoped>

</style>
