<script lang="ts" setup>
import Welcome from "@/components/Welcome.vue";
</script>

<template>
	<main class="flex size-full flex-col items-center justify-center gap-4 p-10 sm:px-72">
		<Suspense>
			<template #fallback>
				<pv-progress-spinner
					:dt="{
						color: {
							1: 'var(--pv-primary-500)',
							2: 'var(--pv-primary-500)',
							3: 'var(--pv-primary-500)',
							4: 'var(--pv-primary-500)',
						},
					}"
					stroke-width="3"
					style="width: 10rem; height: 10rem"
				/>
			</template>
			<Welcome />
		</Suspense>
	</main>
</template>
