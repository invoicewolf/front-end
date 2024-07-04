import "./assets/main.css";
import { en } from "@/langs/en";
import { nl } from "@/langs/nl";
import { definePreset } from "@primevue/themes";
import Aura from "@primevue/themes/aura";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import Button from "primevue/button";
import Column from "primevue/column";
import PrimeVue from "primevue/config";
import DataTable from "primevue/datatable";
import DatePicker from "primevue/datepicker";
import InputGroup from "primevue/inputgroup";
import InputGroupAddon from "primevue/inputgroupaddon";
import InputMask from "primevue/inputmask";
import InputNumber from "primevue/inputnumber";
import InputText from "primevue/inputtext";
import Menubar from "primevue/menubar";
import Message from "primevue/message";
import Select from "primevue/select";
import Step from "primevue/step";
import StepList from "primevue/steplist";
import StepPanel from "primevue/steppanel";
import StepPanels from "primevue/steppanels";
import Stepper from "primevue/stepper";
import ToggleSwitch from "primevue/toggleswitch";
import Toolbar from "primevue/toolbar";

import { createApp } from "vue";
import { createI18n } from "vue-i18n";
import App from "./App.vue";

const app = createApp(App);

const InvoiceGeneratorPreset = definePreset(Aura, {
	semantic: {
		colorScheme: {
			primary: {
				50: "{sky.50}",
				100: "{sky.100}",
				200: "{sky.200}",
				300: "{sky.300}",
				400: "{sky.400}",
				500: "{sky.500}",
				600: "{sky.600}",
				700: "{sky.700}",
				800: "{sky.800}",
				900: "{sky.900}",
				950: "{sky.950}",
			},
			light: {
				surface: {
					0: "#ffffff",
					50: "{zinc.50}",
					100: "{zinc.100}",
					200: "{zinc.200}",
					300: "{zinc.300}",
					400: "{zinc.400}",
					500: "{zinc.500}",
					600: "{zinc.600}",
					700: "{zinc.700}",
					800: "{zinc.800}",
					900: "{zinc.900}",
					950: "{zinc.950}",
				},
			},
			dark: {
				surface: {
					0: "#ffffff",
					50: "{slate.50}",
					100: "{slate.100}",
					200: "{slate.200}",
					300: "{slate.300}",
					400: "{slate.400}",
					500: "{slate.500}",
					600: "{slate.600}",
					700: "{slate.700}",
					800: "{slate.800}",
					900: "{slate.900}",
					950: "{slate.950}",
				},
			},
		},
	},
});

app.use(PrimeVue, {
	theme: {
		preset: InvoiceGeneratorPreset,
		options: {
			prefix: "pv",
			darkModeSelector: ".dark",
			cssLayer: false,
		},
	},
});

app.component("PvInputText", InputText);
app.component("PvInputNumber", InputNumber);
app.component("PvButton", Button);
app.component("PvToggleSwitch", ToggleSwitch);
app.component("PvSelect", Select);
app.component("PvMenubar", Menubar);

app.component("PvStepper", Stepper);
app.component("PvStepList", StepList);
app.component("PvStep", Step);
app.component("PvStepPanels", StepPanels);
app.component("PvStepPanel", StepPanel);

app.component("PvToolbar", Toolbar);
app.component("PvDataTable", DataTable);
app.component("PvColumn", Column);

app.component("PvMessage", Message);

app.component("PvInputGroup", InputGroup);
app.component("PvInputGroupAddon", InputGroupAddon);
app.component("PvInputMask", InputMask);

app.component("PvDatePicker", DatePicker);

app.component("VueDatePicker", VueDatePicker);

export const i18n = createI18n({
	legacy: false,
	locale: localStorage.getItem("locale") || "en",
	fallbackLocale: "en",
	globalInjection: true,
	messages: {
		en,
		nl,
	},
});

app.use(i18n);

app.mount("#app");
