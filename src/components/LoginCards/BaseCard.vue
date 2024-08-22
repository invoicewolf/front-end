<script setup lang="ts">
import InvoiceWolfNameLogo from "@/components/InvoiceWolfNameLogo.vue";

defineProps<{
	showLoadingBar?: boolean;
}>();
</script>

<template>
	<pv-card class="w-[28rem]">
		<template #header>
			<div class="flex h-40 items-center justify-center rounded-t-lg bg-primary-100 p-4 dark:bg-primary-900">
				<InvoiceWolfNameLogo arrangement="vertical" size="large" no-logo />
			</div>
			<pv-progress-bar
				v-if="showLoadingBar" mode="indeterminate"
				style="height: 6px; border-radius: 0; background-color: var(--pv-card-background)"
			/>
		</template>
		<template #title>
			<slot name="title" />
		</template>
		<template #content>
			<slot name="content" />
		</template>
	</pv-card>
</template>

<style scoped>

</style>
