<script setup lang="ts">
import { useFileSystemAccess } from "@vueuse/core";
import type { MenuItem } from "primevue/menuitem";
import { onMounted, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import InvoiceWolfNameLogo from "@/components/InvoiceWolfNameLogo.vue";
import { getRoles } from "@/utils/authorizationHelper";
import DarkModeSelector from "@/components/DarkModeSelector.vue";
import LanguageSelector from "@/components/LanguageSelector.vue";
import { useInvoiceManager } from "@/composables/invoice-manager";

const invoiceManager = useInvoiceManager();
const i18n = useI18n();
const router = useRouter();

const menubarItems = ref<MenuItem[]>([]);

async function openFile() {
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

	await res.open();

	if (!res.data.value) {
		return;
	}

	invoiceManager.open(JSON.parse(res.data.value));
}

const userLoggedIn = ref(!!localStorage.getItem("access_token"));

async function refreshMenuBar() {
	menubarItems.value = [{
		label: i18n.t("general.menu.invoice"),
		items: [
			{
				label: i18n.t("general.menu.new"),
				command: () => {
					router.push("/create-invoice");
					invoiceManager.new();
				},
			},
			{
				label: i18n.t("general.menu.open"),
				command: () => openFile(),
			},
		],
	}];

	if (userLoggedIn.value) {
		menubarItems.value.push({
			label: i18n.t("general.menu.profile"),
			route: "/profile",
		});
	}

	if (getRoles().includes("admin")) {
		menubarItems.value.push({
			label: i18n.t("general.menu.admin"),
			route: "/admin",
		});
	}

	menubarItems.value.push({
		component: "languageSelector",
	});
}

watch(i18n.locale, () => {
	refreshMenuBar();
});

onMounted(() => {
	refreshMenuBar();
});

function signOut() {
	localStorage.removeItem("access_token");
	router.push("/login");
}
</script>

<template>
	<nav>
		<pv-menubar
			class="group h-20 rounded-none border-x-0 border-t-0 p-6"
			:model="menubarItems"
			:pt="{
				item: {
					class: 'z-10',
				},
			}"
		>
			<template #start>
				<router-link to="/">
					<InvoiceWolfNameLogo class="block group-[.p-menubar-mobile]:hidden" arrangement="horizontal" size="normal" :free="!userLoggedIn" />
					<InvoiceWolfNameLogo no-text class="hidden group-[.p-menubar-mobile]:block" arrangement="horizontal" size="normal" :free="!userLoggedIn" />
				</router-link>
			</template>
			<template #item="{ item, props, hasSubmenu }">
				<router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" active-class="text-primary-500" class="font-medium">
					<a v-ripple :href="href" v-bind="props.action" @click="navigate">
						<span>{{ item.label }}</span>
					</a>
				</router-link>
				<a
					v-else-if="!item.component" v-ripple :href="item.url" :target="item.target" v-bind="props.action" class="font-medium"
				>
					<span>{{ item.label }}</span>
					<span v-if="hasSubmenu" class="pi pi-fw pi-angle-down" />
				</a>

				<span
					v-if="item.component === 'languageSelector'"
					class="hidden w-full px-2 py-1 group-[.p-menubar-mobile]:block"
					@click="(e) => e.stopPropagation()"
				>
					<LanguageSelector class="w-full" />
				</span>
			</template>
			<template #end>
				<span class="flex flex-row items-center gap-4">
					<span class="block group-[.p-menubar-mobile]:hidden">
						<LanguageSelector />
					</span>
					<DarkModeSelector />
					<pv-button v-if="userLoggedIn" label="Sign out" link @click="signOut" />
					<router-link v-else to="/login">
						<pv-button label="Sign in" link />
					</router-link>
				</span>
			</template>
		</pv-menubar>
	</nav>
</template>

<style scoped>

</style>
