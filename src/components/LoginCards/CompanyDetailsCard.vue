<script setup lang="ts">
import NewCompanyDetails from "@/components/NewCompanyDetails.vue";
import BaseCard from "@/components/LoginCards/BaseCard.vue";

defineEmits<{ (e: "step", step: "signIn" | "signUp" | "joinOrCreate" | "companyDetails" | "paymentDetails" | "forgotPassword" | "loading"): void }>();
</script>

<template>
	<BaseCard>
		<template #title>
			{{ $t("login.companyDetails.fillInDetails") }}
		</template>
		<template #content>
			<NewCompanyDetails @success="$emit('step', 'paymentDetails')" />
		</template>
	</BaseCard>
</template>

<style scoped>

</style>
