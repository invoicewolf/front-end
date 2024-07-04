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
		<VuePDF :pdf="pdf" />
		<div class="flex w-56 flex-col gap-4">
			<h1 class="text text-4xl font-medium">
				{{ $t("review.labels.save") }}
			</h1>

			<pv-button :label="$t('review.labels.saveAsPdf')" icon="pi pi-download" @click="$emit('exportToPdf')" />
			<pv-button :label="$t('review.labels.saveAsInvoice')" icon="pi pi-save" @click="$emit('save')" />
		</div>
	</div>
</template>

<style scoped>

</style>
