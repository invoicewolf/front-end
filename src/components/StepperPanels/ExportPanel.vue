<script setup lang="ts">
import { VuePDF, usePDF } from "@tato30/vue-pdf";
import { useInvoiceManager } from "@/composables/invoice-manager";

defineEmits(["save", "exportToPdf"]);

const invoiceManager = useInvoiceManager();

const { pdf } = usePDF({
	data: await invoiceManager.createPdf(),
});
</script>

<template>
	<div class="grid grid-cols-2">
		<VuePDF :pdf="pdf" class="drop-shadow" />
		<div class="flex w-56 flex-col gap-4">
			<h1 class="text select-none text-4xl font-medium">
				{{ $t("export.save") }}
			</h1>

			<pv-button
				:label="$t('export.labels.saveAsPdf')"
				icon="pi pi-download"
				data-cy="saveAsPdf"
				@click="$emit('exportToPdf')"
			/>
			<pv-button
				:label="$t('export.labels.saveAsInvoice')"
				icon="pi pi-save"
				data-cy="saveAsIw"
				@click="$emit('save')"
			/>
		</div>
	</div>
</template>

<style scoped>

</style>
