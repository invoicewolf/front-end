<script setup lang="ts">
defineProps<{
	hidePreviousButton?: boolean;
	disableNextButton?: boolean;
}>();

defineEmits(["previous", "next"]);
</script>

<template>
	<div class="size-full">
		<slot />
	</div>
	<div class="mt-4 flex w-full justify-between">
		<pv-button
			:class="{ invisible: hidePreviousButton }"
			:label="$t('general.stepper.previous')"
			icon="pi pi-arrow-left"
			severity="secondary"
			data-cy="previousButton"
			@click="$emit('previous')"
		/>
		<pv-button
			:label="$t('general.stepper.next')"
			icon="pi pi-arrow-right"
			icon-pos="right"
			:disabled="disableNextButton"
			data-cy="nextButton"
			@click="$emit('next')"
		/>
	</div>
</template>

<style scoped>

</style>
