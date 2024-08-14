<script setup lang="ts">
import DarkModeSelector from "@/components/DarkModeSelector.vue";
import InvoiceWolfNameLogo from "@/components/InvoiceWolfNameLogo.vue";
import LanguageSelector from "@/components/LanguageSelector.vue";
</script>

<template>
	<nav>
		<pv-menubar
			:pt="{
				root: {
					class: 'rounded-none border-t-0 border-r-0 border-l-0',
				},
				item: {
					class: 'z-10',
				},
			}"
		>
			<template #start>
				<InvoiceWolfNameLogo arrangement="horizontal" size="normal" />
			</template>
			<template #end>
				<span class="flex flex-row items-center gap-4">
					<DarkModeSelector />
					<LanguageSelector />
				</span>
			</template>
		</pv-menubar>
	</nav>
</template>

<style scoped>

</style>
