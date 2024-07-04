<script setup lang="ts">
import { darkmode, toggleMode } from "@/stores/darkModeStore";
</script>

<template>
	<div class="flex flex-row items-center gap-2">
		<i class="pi pi-sun" />
		<pv-toggle-switch v-model="darkmode" binary @change="toggleMode()" />
		<i class="pi pi-moon" />
	</div>
</template>

<style scoped>

</style>
