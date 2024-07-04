<script setup lang="ts">
import { useFileSystemAccess } from "@vueuse/core";
import type { MenuItem } from "primevue/menuitem";
import { computed, onBeforeMount, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import CurrencySelector from "@/components/CurrencySelector.vue";
import DarkModeSelector from "@/components/DarkModeSelector.vue";
import LanguageSelector from "@/components/LanguageSelector.vue";
import AddresseeDetailsPanel from "@/components/StepperPanels/AddresseeDetailsPanel.vue";
import BasePanel from "@/components/StepperPanels/BasePanel.vue";
import CompanyDetailsPanel from "@/components/StepperPanels/CompanyDetailsPanel.vue";
import ExportPanel from "@/components/StepperPanels/ExportPanel.vue";
import PaymentDetailsPanel from "@/components/StepperPanels/PaymentDetailsPanel.vue";
import ProductsPanel from "@/components/StepperPanels/ProductsPanel.vue";
import { useInvoiceManager } from "@/composables/invoice-manager";
import { checkMode } from "@/stores/darkModeStore";

const invoiceManager = useInvoiceManager();
const i18n = useI18n();

onBeforeMount(() => {
	checkMode();
});

const menubarItems = ref<MenuItem[]>([{
	label: i18n.t("general.menu.invoice"),
	items: [
		{
			label: i18n.t("general.menu.new"),
			command: () => invoiceManager.new(),
		},
		{
			label: i18n.t("general.menu.open"),
			command: () => openFile(),
		},
		{
			label: i18n.t("general.menu.save"),
			command: () => saveFile(),
		},
		{
			label: i18n.t("general.menu.exportToPdf"),
			command: () => exportFile(),
		},
	],
}]);

async function openFile() {
	const res = useFileSystemAccess({
		dataType: "Text",
		types: [{
			description: "Vinvoice file",
			accept: {
				"application/json": [".vinvoice"],
			},
		}],
		excludeAcceptAllOption: true,
	});

	await res.open();

	if (!res.data.value) {
		return;
	}

	invoiceManager.open(JSON.parse(res.data.value));
}

async function saveFile() {
	const res = useFileSystemAccess({
		dataType: "Text",
		types: [{
			description: "Vinvoice file",
			accept: {
				"application/json": [".vinvoice"],
			},
		}],
		excludeAcceptAllOption: true,
	});

	res.data.value = invoiceManager.getData();

	res.save();
}

async function exportFile() {
	const res = useFileSystemAccess({
		dataType: "ArrayBuffer",
		types: [{
			description: "Invoice PDF",
			accept: {
				"application/pdf": [".pdf"],
			},
		}],
		excludeAcceptAllOption: true,
	});

	res.data.value = (await invoiceManager.createPdf()).buffer;

	res.save();
}

const pdfComponentKey = ref(0);

async function refreshPdf() {
	pdfComponentKey.value++;
}

async function refreshMenuBar() {
	menubarItems.value = [{
		label: i18n.t("general.menu.invoice"),
		items: [
			{
				label: i18n.t("general.menu.new"),
				command: () => invoiceManager.new(),
			},
			{
				label: i18n.t("general.menu.open"),
				command: () => openFile(),
			},
			{
				label: i18n.t("general.menu.save"),
				command: () => saveFile(),
			},
			{
				label: i18n.t("general.menu.exportToPdf"),
				command: () => exportFile(),
			},
		],
	}];
}

watch(i18n.locale, () => {
	refreshPdf();
	refreshMenuBar();
});

const enableStep1NextButton = computed(() => {
	return !(
		!!invoiceManager.invoice.companyDetails.representativeName
		&& !!invoiceManager.invoice.companyDetails.representativeEmail
		&& !!invoiceManager.invoice.companyDetails.companyName
		&& !!invoiceManager.invoice.companyDetails.zipCode
		&& !!invoiceManager.invoice.companyDetails.houseNumber
		&& !!invoiceManager.invoice.companyDetails.streetName
		&& !!invoiceManager.invoice.companyDetails.city
	);
});

const enableStep2NextButton = computed(() => {
	return !(
		!!invoiceManager.invoice.addresseeDetails.companyName
		&& !!invoiceManager.invoice.addresseeDetails.zipCode
		&& !!invoiceManager.invoice.addresseeDetails.houseNumber
		&& !!invoiceManager.invoice.addresseeDetails.streetName
		&& !!invoiceManager.invoice.addresseeDetails.city
	);
});

const enableStep3NextButton = computed(() => {
	return !(
		invoiceManager.invoice.products.length > 0
	);
});

const enableStep4NextButton = computed(() => {
	return !(
		!!invoiceManager.invoice.paymentDetails.iban
		&& !!invoiceManager.invoice.paymentDetails.currency
		&& !!invoiceManager.invoice.paymentDetails.invoiceDate
		&& !!invoiceManager.invoice.paymentDetails.dueDate
		&& !!invoiceManager.invoice.paymentDetails.invoiceNumber
	);
});
</script>

<template>
	<div class="size-full">
		<pv-menubar
			:model="menubarItems"
			:pt="{
				item: {
					class: 'z-10',
				},
			}"
		>
			<template #start>
				<span class="text-xl font-bold">Invoicely.<span class="text-primary-500">org</span></span>
			</template>
			<template #end>
				<span class="flex flex-row items-center gap-4">
					<DarkModeSelector />
					<CurrencySelector />
					<LanguageSelector />
				</span>
			</template>
		</pv-menubar>
		<div class="size-full p-10">
			<pv-stepper value="1">
				<pv-step-list>
					<pv-step value="1">
						1: {{ $t("general.stepper.step1") }}
					</pv-step>
					<pv-step value="2">
						2: {{ $t("general.stepper.step2") }}
					</pv-step>
					<pv-step value="3">
						3: {{ $t("general.stepper.step3") }}
					</pv-step>
					<pv-step value="4">
						4: {{ $t("general.stepper.step4") }}
					</pv-step>
					<pv-step value="5">
						5: {{ $t("general.stepper.step5") }}
					</pv-step>
				</pv-step-list>
				<pv-step-panels>
					<pv-step-panel v-slot="{ activateCallback }" value="1">
						<BasePanel
							hide-previous-button
							:disable-next-button="enableStep1NextButton"
							@next="activateCallback('2')"
						>
							<CompanyDetailsPanel />
						</BasePanel>
					</pv-step-panel>
					<pv-step-panel v-slot="{ activateCallback }" value="2">
						<BasePanel
							:disable-next-button="enableStep2NextButton"
							@next="activateCallback('3')"
							@previous="activateCallback('1')"
						>
							<AddresseeDetailsPanel />
						</BasePanel>
					</pv-step-panel>
					<pv-step-panel v-slot="{ activateCallback }" value="3">
						<BasePanel
							:disable-next-button="enableStep3NextButton"
							@next="activateCallback('4')"
							@previous="activateCallback('2')"
						>
							<ProductsPanel />
						</BasePanel>
					</pv-step-panel>
					<pv-step-panel v-slot="{ activateCallback }" value="4">
						<BasePanel
							:disable-next-button="enableStep4NextButton"
							@next="activateCallback('5')"
							@previous="activateCallback('3')"
						>
							<PaymentDetailsPanel />
						</BasePanel>
					</pv-step-panel>
					<pv-step-panel v-slot="{ activateCallback }" value="5">
						<BasePanel
							@next="
								activateCallback('1');
								invoiceManager.invoice.reset();
							"
							@previous="activateCallback('4')"
						>
							<Suspense>
								<ExportPanel :key="pdfComponentKey" @save="saveFile" @export-to-pdf="exportFile" />
							</Suspense>
						</BasePanel>
					</pv-step-panel>
				</pv-step-panels>
			</pv-stepper>
		</div>
	</div>
</template>

<style scoped>

</style>
