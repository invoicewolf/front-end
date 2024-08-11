<script setup lang="ts">
import { useFileSystemAccess } from "@vueuse/core";
import { computed, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import SlideTransition from "@/components/Transitions/SlideTransition.vue";
import AddresseeDetailsPanel from "@/components/StepperPanels/AddresseeDetailsPanel.vue";
import BasePanel from "@/components/StepperPanels/BasePanel.vue";
import CompanyDetailsPanel from "@/components/StepperPanels/CompanyDetailsPanel.vue";
import ExportPanel from "@/components/StepperPanels/ExportPanel.vue";
import PaymentDetailsPanel from "@/components/StepperPanels/PaymentDetailsPanel.vue";
import ProductsPanel from "@/components/StepperPanels/ProductsPanel.vue";
import { useInvoiceManager } from "@/composables/invoice-manager";

const invoiceManager = useInvoiceManager();
const i18n = useI18n();

async function saveFile() {
	const res = useFileSystemAccess({
		dataType: "Text",
		types: [{
			description: "IW invoice file",
			accept: {
				"application/json": [".iw"],
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

const enableStep1NextButton = computed(() => {
	const { companyEmail, companyName, zipCode, houseNumber, streetName, city, country } = invoiceManager.invoice.companyDetails;

	return !(
		invoiceManager.invoice.companyDetails.isValidEmail()
		&& !!companyEmail
		&& !!companyName
		&& !!zipCode
		&& !!houseNumber
		&& !!streetName
		&& !!city
		&& !!country
	);
});

const enableStep2NextButton = computed(() => {
	const { companyName, zipCode, houseNumber, streetName, city } = invoiceManager.invoice.addresseeDetails;

	return !(
		!!companyName
		&& !!zipCode
		&& !!houseNumber
		&& !!streetName
		&& !!city
	);
});

const enableStep3NextButton = computed(() => {
	const { products } = invoiceManager.invoice;
	return !(
		products.length > 0
	);
});

const enableStep4NextButton = computed(() => {
	const { iban, currency, invoiceDate, dueDate, invoiceNumber } = invoiceManager.invoice.paymentDetails;
	return !(
		!!iban
		&& !!currency
		&& !!invoiceDate
		&& !!dueDate
		&& !!invoiceNumber
	);
});

const activeStep = ref("1");

const pdfComponentKey = ref(0);

async function refreshPdf() {
	pdfComponentKey.value++;
}

watch(i18n.locale, () => {
	refreshPdf();
});

watch(activeStep, () => {
	refreshPdf();
	scrollTo({ top: 0, behavior: "smooth" });
});
</script>

<template>
	<main class="p-10">
		<pv-stepper v-model:value="activeStep">
			<pv-step-list>
				<pv-step value="1" class="select-none">
					{{ $t("general.stepper.step1") }}
				</pv-step>
				<pv-step value="2" class="select-none">
					{{ $t("general.stepper.step2") }}
				</pv-step>
				<pv-step value="3" class="select-none">
					{{ $t("general.stepper.step3") }}
				</pv-step>
				<pv-step value="4" class="select-none">
					{{ $t("general.stepper.step4") }}
				</pv-step>
				<pv-step value="5" class="select-none">
					{{ $t("general.stepper.step5") }}
				</pv-step>
			</pv-step-list>
			<pv-step-panels>
				<pv-step-panel v-slot="{ activateCallback }" value="1" class="p-10">
					<SlideTransition>
						<div v-if="activeStep === '1'">
							<BasePanel
								hide-previous-button
								:disable-next-button="enableStep1NextButton"
								@next="activateCallback('2')"
							>
								<CompanyDetailsPanel />
							</BasePanel>
						</div>
					</SlideTransition>
				</pv-step-panel>
				<pv-step-panel v-slot="{ activateCallback }" value="2" class="p-10">
					<SlideTransition>
						<div v-if="activeStep === '2'">
							<BasePanel
								:disable-next-button="enableStep2NextButton"
								@next="activateCallback('3')"
								@previous="activateCallback('1')"
							>
								<AddresseeDetailsPanel />
							</BasePanel>
						</div>
					</SlideTransition>
				</pv-step-panel>
				<pv-step-panel v-slot="{ activateCallback }" value="3" class="p-10">
					<SlideTransition>
						<div v-if="activeStep === '3'">
							<BasePanel
								:disable-next-button="enableStep4NextButton"
								@next="activateCallback('4')"
								@previous="activateCallback('2')"
							>
								<PaymentDetailsPanel />
							</BasePanel>
						</div>
					</SlideTransition>
				</pv-step-panel>
				<pv-step-panel v-slot="{ activateCallback }" value="4" class="p-10">
					<SlideTransition>
						<div v-if="activeStep === '4'">
							<BasePanel
								:disable-next-button="enableStep3NextButton"
								@next="activateCallback('5')"
								@previous="activateCallback('3')"
							>
								<ProductsPanel />
							</BasePanel>
						</div>
					</SlideTransition>
				</pv-step-panel>
				<pv-step-panel v-slot="{ activateCallback }" value="5" class="p-10">
					<SlideTransition>
						<div v-if="activeStep === '5'">
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
						</div>
					</SlideTransition>
				</pv-step-panel>
			</pv-step-panels>
		</pv-stepper>
	</main>
</template>
