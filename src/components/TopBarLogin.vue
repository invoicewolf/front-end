<script setup lang="ts">
import DarkModeSelector from "@/components/DarkModeSelector.vue";
import InvoiceWolfNameLogo from "@/components/InvoiceWolfNameLogo.vue";
import LanguageSelector from "@/components/LanguageSelector.vue";
</script>

<template>
	<nav class="flex h-20 w-full justify-between bg-surface-0 p-6 dark:bg-surface-950">
		<router-link to="/">
			<InvoiceWolfNameLogo arrangement="horizontal" size="normal" />
		</router-link>
		<div class="flex flex-row items-center gap-6">
			<LanguageSelector />
			<DarkModeSelector />
		</div>
	</nav>
</template>

<style scoped>

</style>
