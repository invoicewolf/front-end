<script setup lang="ts">
defineProps<{
	label: string;
	id: string;
	required?: boolean;
	description?: string;
	labelClass?: string;
	skeletonWidth?: string;
}>();
</script>

<template>
	<div class="flex flex-col gap-2">
		<label :for="id" class=" select-none font-medium" :class="labelClass">{{ label }}<span
			v-if="required"
			class="text-danger"
		>*</span></label>
		<pv-skeleton height="2.6rem" :width="skeletonWidth" />
		<span v-if="description" class="select-none text-sm">{{ description }}</span>
	</div>
</template>

<style>

</style>
