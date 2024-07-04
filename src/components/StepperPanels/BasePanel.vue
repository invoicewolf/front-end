<script setup lang="ts">
defineProps<{
	hidePreviousButton?: boolean;
	disableNextButton?: boolean;
}>();

defineEmits(["previous", "next"]);
</script>

<template>
	<div class="size-full rounded-lg border-2 border-dashed border-surface-200 bg-surface-100 p-10 dark:border-surface-800 dark:bg-surface-900">
		<slot />
	</div>
	<div class="mt-4 flex w-full justify-between">
		<pv-button
			:class="{ invisible: hidePreviousButton }"
			:label="$t('general.stepper.previous')"
			icon="pi pi-arrow-left"
			severity="secondary"
			@click="$emit('previous')"
		/>
		<pv-button
			:label="$t('general.stepper.next')"
			icon="pi pi-arrow-right"
			icon-pos="right"
			:disabled="disableNextButton"
			@click="$emit('next')"
		/>
	</div>
</template>

<style scoped>

</style>
