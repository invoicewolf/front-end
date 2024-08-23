<script setup lang="ts">
import type { MenuItem } from "primevue/menuitem";
import { ref } from "vue";
import DarkModeSelector from "@/components/DarkModeSelector.vue";
import InvoiceWolfNameLogo from "@/components/InvoiceWolfNameLogo.vue";
import LanguageSelector from "@/components/LanguageSelector.vue";

const menubarItems = ref<MenuItem[]>([{
	component: "languageSelector",
}]);
</script>

<template>
	<pv-menubar
		class="group h-20 w-full border-none bg-surface-0 p-6 dark:bg-surface-950"
		:model="menubarItems"
		:pt="{
			item: {
				class: 'z-10',
			},
		}"
	>
		<template #start>
			<router-link to="/">
				<InvoiceWolfNameLogo arrangement="horizontal" size="normal" />
			</router-link>
		</template>
		<template #item="{ item, props, hasSubmenu }">
			<router-link
				v-if="item.route" v-slot="{ href, navigate }" :to="item.route" active-class="text-primary-500"
				class="font-medium"
			>
				<a v-ripple :href="href" v-bind="props.action" @click="navigate">
					<span>{{ item.label }}</span>
				</a>
			</router-link>
			<a
				v-else-if="!item.component" v-ripple :href="item.url" :target="item.target" v-bind="props.action"
				class="font-medium"
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
			</span>
		</template>
	</pv-menubar>
</template>

<style scoped>

</style>
