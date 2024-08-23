<script setup lang="ts">
defineProps<{
	wolfCubButton?: boolean;
	hidePrivacyPolicy?: boolean;
}>();
</script>

<template>
	<div class="flex h-full flex-col justify-between gap-4 bg-surface-0 p-10 dark:bg-surface-950">
		<div class="flex flex-col gap-24">
			<div class="flex flex-col gap-4">
				<h1 class="text-4xl font-semibold">
					<slot name="title" />
				</h1>
				<p class="text-sm">
					<slot name="subtitle" />
				</p>
			</div>

			<div class="flex flex-col gap-4">
				<slot name="content" />
			</div>
		</div>

		<div v-if="wolfCubButton" class="flex w-full flex-row items-center gap-4">
			<hr class="w-full border-primary-300 dark:border-primary-900">
			<p class="text-primary-300 dark:text-primary-900">
				OR
			</p>
			<hr class="w-full border-primary-300 dark:border-primary-900">
		</div>

		<router-link v-if="wolfCubButton" to="/create-invoice" class="w-full">
			<pv-button class="w-full" :label="$t('login.useFreeVersion')" />
		</router-link>

		<div class="flex flex-row items-center justify-between">
			<p class="text-sm">
				{{ $t("login.agreeBySignIn") }}
				<a href="https://invoicewolf.net/privacy-policy" class="text-sm text-primary-500 hover:underline">
					{{ $t("login.privacyPolicy") }}
				</a>
			</p>
			<slot name="previousButton" />
		</div>
	</div>
</template>

<style scoped>

</style>
