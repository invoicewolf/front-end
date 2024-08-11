<script lang="ts" setup>
import ProfileContent from "@/components/Profile/ProfileContent.vue";
import ProfileSkeletons from "@/components/Profile/ProfileSkeleton.vue";
</script>

<template>
	<main class="flex size-full flex-col items-center justify-center">
		<Suspense>
			<template #fallback>
				<ProfileSkeletons />
			</template>
			<ProfileContent />
		</Suspense>
	</main>
</template>
