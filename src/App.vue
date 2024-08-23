<script setup lang="ts">
import { onBeforeMount } from "vue";
import RouterTransition from "@/components/Transitions/RouterTransition.vue";
import { refreshToken } from "@/utils/helpers/refreshToken";
import { checkMode } from "@/stores/darkModeStore";

onBeforeMount(() => {
	checkMode();
	refreshToken();
});
</script>

<template>
	<div class="flex min-h-screen flex-col bg-surface-50 dark:bg-surface-950">
		<RouterView name="topBar" />
		<RouterView v-slot="{ Component }" class="size-full flex-1">
			<RouterTransition>
				<component :is="Component" />
			</RouterTransition>
		</RouterView>
	</div>
	<pv-toast />
	<pv-toast group="br" position="bottom-right" />
</template>
