<script setup lang="ts">
import NewCompanyDetails from "@/components/NewCompanyDetails.vue";

defineEmits<{ (e: "step", step: "signIn" | "signUp" | "joinOrCreate" | "companyDetails" | "paymentDetails" | "forgotPassword" | "loading"): void }>();
</script>

<template>
	<div class="flex h-full flex-col justify-between gap-4 bg-surface-0 p-10 dark:bg-surface-950">
		<div class="flex h-full flex-col gap-24">
			<div class="flex flex-col gap-4">
				<h1 class="text-4xl font-semibold">
					{{ $t("login.companyDetails.fillInDetails") }}
				</h1>
			</div>

			<NewCompanyDetails class="h-full" @success="$emit('step', 'paymentDetails')" @previous="$emit('step', 'joinOrCreate')" />
		</div>
	</div>
</template>

<style scoped>

</style>
