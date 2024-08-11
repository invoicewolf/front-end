<script lang="ts" setup>
import InvoiceWolfNameLogo from "@/components/InvoiceWolfNameLogo.vue";
</script>

<template>
	<main class="flex size-full flex-col items-center justify-center gap-4 px-72">
		<main class="flex size-full flex-col items-center justify-center gap-4 px-72">
			<InvoiceWolfNameLogo arrangement="vertical" size="large" />

			<pv-divider />

			<span class="text-4xl font-bold">Oops!</span>
			<span class="text-xl">You do not have the required permissions to view this page.</span>

			<router-link to="/">
				<pv-button label="Go to home" icon="pi pi-home" />
			</router-link>
		</main>
	</main>
</template>
