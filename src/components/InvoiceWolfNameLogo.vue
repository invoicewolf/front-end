<script setup lang="ts">
import { useCssVar } from "@vueuse/core";
import WolfIcon from "@/components/Icons/WolfIcon.vue";

defineProps<{
	size: "normal" | "large";
	arrangement: "horizontal" | "vertical";
	free?: boolean;
	noLogo?: boolean;
	noText?: boolean;
}>();

const devMode = import.meta.env.DEV;
</script>

<template>
	<div v-if="arrangement === 'horizontal'">
		<div v-if="size === 'normal'" class="flex flex-row items-center gap-2">
			<WolfIcon v-if="!noLogo" :color="useCssVar('--pv-primary-500').value" class="size-8" />
			<span v-if="free && noText" class="select-none align-bottom text-xs font-bold text-primary-500">CUB</span>
			<div v-if="!noText" class="flex flex-col justify-center">
				<span class="select-none text-xl font-bold">Invoice<span
					class="text-primary-500"
				>Wolf <span v-if="free" class="align-bottom text-xs">CUB</span></span></span>
				<small
					v-if="devMode"
					class="select-none text-center text-[11px] font-bold text-danger"
				>
					DEVELOPMENT
				</small>
			</div>
		</div>
	</div>
	<div v-else-if="arrangement === 'vertical'">
		<div v-if="size === 'normal'" class="flex flex-col items-center gap-2">
			<WolfIcon v-if="!noLogo" :color="useCssVar('--pv-primary-500').value" class="size-32" />
			<span v-if="free && noText" class="select-none align-bottom text-xs font-bold text-primary-500">CUB</span>
			<div v-if="!noText" class="flex flex-col justify-center">
				<span class="select-none text-4xl font-bold">Invoice<span
					class="text-primary-500"
				>Wolf <span v-if="free" class="align-bottom text-xs">CUB</span></span></span>
				<small
					v-if="devMode"
					class="select-none text-center font-bold text-danger"
				>
					DEVELOPMENT
				</small>
			</div>
		</div>
		<div v-else-if="size === 'large'" class="flex flex-col items-center gap-2">
			<WolfIcon v-if="!noLogo" :color="useCssVar('--pv-primary-500').value" class="size-48" />
			<span v-if="free && noText" class="select-none align-bottom text-xs font-bold text-primary-500">CUB</span>
			<div v-if="!noText" class="flex flex-col justify-center">
				<span class="select-none text-6xl font-bold">Invoice<span
					class="text-primary-500"
				>Wolf <span v-if="free" class="align-bottom text-xs">CUB</span></span></span>
				<small
					v-if="devMode"
					class="select-none text-center text-xl font-bold text-danger"
				>
					DEVELOPMENT
				</small>
			</div>
		</div>
	</div>
</template>

<style scoped>

</style>
