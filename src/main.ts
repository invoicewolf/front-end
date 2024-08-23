import "./assets/main.css";

import { createClient } from "@hey-api/client-fetch";

import { definePreset } from "@primevue/themes";
import Aura from "@primevue/themes/aura";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { createPinia } from "pinia";
import Avatar from "primevue/avatar";
import BlockUI from "primevue/blockui";
import Button from "primevue/button";
import Card from "primevue/card";
import Column from "primevue/column";
import PrimeVue from "primevue/config";
import ConfirmationService from "primevue/confirmationservice";
import ConfirmDialog from "primevue/confirmdialog";
import DataTable from "primevue/datatable";
import DatePicker from "primevue/datepicker";
import Dialog from "primevue/dialog";
import Divider from "primevue/divider";
import IconField from "primevue/iconfield";
import InputGroup from "primevue/inputgroup";
import InputGroupAddon from "primevue/inputgroupaddon";
import InputIcon from "primevue/inputicon";
import InputMask from "primevue/inputmask";
import InputNumber from "primevue/inputnumber";
import InputText from "primevue/inputtext";
import Knob from "primevue/knob";
import Menubar from "primevue/menubar";
import Message from "primevue/message";
import Password from "primevue/password";
import ProgressBar from "primevue/progressbar";
import ProgressSpinner from "primevue/progressspinner";
import Ripple from "primevue/ripple";
import Select from "primevue/select";
import Skeleton from "primevue/skeleton";
import Step from "primevue/step";
import StepList from "primevue/steplist";
import StepPanel from "primevue/steppanel";
import StepPanels from "primevue/steppanels";
import Stepper from "primevue/stepper";
import Tab from "primevue/tab";
import TabList from "primevue/tablist";
import TabPanel from "primevue/tabpanel";
import TabPanels from "primevue/tabpanels";
import Tabs from "primevue/tabs";
import Toast from "primevue/toast";
import ToastService from "primevue/toastservice";
import ToggleSwitch from "primevue/toggleswitch";
import Toolbar from "primevue/toolbar";

import { createApp } from "vue";
import { createI18n } from "vue-i18n";
import App from "./App.vue";
import { router } from "./router";
import { nlNL } from "@/langs/nl-NL";
import { enUS } from "@/langs/en-US";
import { enGB } from "@/langs/en-GB";

const app = createApp(App);

const InvoiceGeneratorPreset = definePreset(Aura, {
	semantic: {
		colorScheme: {
			primary: {
				50: "{teal.50}",
				100: "{teal.100}",
				200: "{teal.200}",
				300: "{teal.300}",
				400: "{teal.400}",
				500: "{teal.500}",
				600: "{teal.600}",
				700: "{teal.700}",
				800: "{teal.800}",
				900: "{teal.900}",
				950: "{teal.950}",
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
		},
	},
});

app.use(PrimeVue, {
	theme: {
		preset: InvoiceGeneratorPreset,
		options: {
			prefix: "pv",
			darkModeSelector: ".dark",
			cssLayer: {
				name: "primevue",
				order: "tailwind-base, primevue, tailwind-utilities",
			},
		},
	},
	ripple: true,
});

app.directive("ripple", Ripple);

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

app.component("PvTabs", Tabs);
app.component("PvTabList", TabList);
app.component("PvTab", Tab);
app.component("PvTabPanels", TabPanels);
app.component("PvTabPanel", TabPanel);

app.component("PvToolbar", Toolbar);
app.component("PvDataTable", DataTable);
app.component("PvColumn", Column);

app.component("PvMessage", Message);

app.component("PvInputGroup", InputGroup);
app.component("PvInputGroupAddon", InputGroupAddon);
app.component("PvInputMask", InputMask);

app.component("PvBlockUi", BlockUI);
app.component("PvToast", Toast);

app.component("PvDatePicker", DatePicker);

app.component("VueDatePicker", VueDatePicker);

app.component("PvCard", Card);
app.component("PvIconField", IconField);
app.component("PvInputIcon", InputIcon);
app.component("PvPassword", Password);

app.component("PvDivider", Divider);

app.component("PvProgressSpinner", ProgressSpinner);
app.component("PvProgressBar", ProgressBar);

app.component("PvDialog", Dialog);
app.component("PvConfirmDialog", ConfirmDialog);

app.component("PvAvatar", Avatar);

app.component("PvSkeleton", Skeleton);

app.component("PvKnob", Knob);

export const i18n = createI18n({
	legacy: false,
	locale: localStorage.getItem("locale") || "enUS",
	fallbackLocale: "enUS",
	globalInjection: true,
	messages: {
		enGB,
		enUS,
		nlNL,
	},
});

const firebaseConfig = {
	apiKey: "AIzaSyBNtn0rxPxW1RykmTUA_D29GjJcsGsT1mk",
	authDomain: "invoicewolf.firebaseapp.com",
	projectId: "invoicewolf",
	storageBucket: "invoicewolf.appspot.com",
	messagingSenderId: "322403430458",
	appId: "1:322403430458:web:60218c0c69578e40b98503",
};

const firebaseApp = initializeApp(firebaseConfig);
getAnalytics(firebaseApp);

const pinia = createPinia();

app.use(ToastService);
app.use(ConfirmationService);

app.use(i18n);
app.use(pinia);

app.use(router);

const client = createClient({
	baseUrl: import.meta.env.VITE_API_URL,
});

client.interceptors.request.use((request) => {
	request.headers.set("Authorization", `Bearer ${localStorage.getItem("access_token")}`);
	return request;
});

app.mount("#app");
