<script setup lang="ts">
defineProps<{
	addRequiredExplanation?: boolean;
}>();
</script>

<template>
	<div class="flex flex-col gap-6">
		<slot name="form" />
		<p v-if="addRequiredExplanation" class="select-none">
			<span class="text-danger">*</span>{{ $t("general.forms.requiredExplanation") }}
		</p>
	</div>
</template>

<style scoped>

</style>
