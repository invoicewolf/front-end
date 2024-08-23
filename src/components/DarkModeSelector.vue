<script setup lang="ts">
import { darkmode, setDark, setLight } from "@/stores/darkModeStore";
</script>

<template>
	<span class="cursor-pointer text-primary-500 duration-300 hover:text-primary-400">
		<i v-if="!darkmode" class="pi pi-moon" style="font-size: 1.25rem; line-height: 1.75rem" @click="setDark" />
		<i v-else class="pi pi-sun" style="font-size: 1.25rem; line-height: 1.75rem" @click="setLight" />
	</span>
</template>

<style scoped>

</style>
