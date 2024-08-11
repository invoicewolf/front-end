<script setup lang="ts">
import BaseForm from "@/components/Forms/BaseForm.vue";
import TextInputSkeleton from "@/components/TextInputSkeleton.vue";
</script>

<template>
	<div class="flex max-w-sm flex-col gap-6">
		<BaseForm add-required-explanation>
			<template #form>
				<TextInputSkeleton
					id="iban"
					:label="$t('paymentDetails.labels.iban')"
					skeleton
				/>
				<div class="flex flex-col gap-2">
					<label for="currency" class="select-none font-medium">{{ $t("paymentDetails.labels.currency") }}<span
						class="text-danger"
					>*</span></label>
					<pv-skeleton height="2.5rem" />
				</div>
			</template>
		</BaseForm>
		<pv-button :label="$t('admin.paymentDetails.buttons.update')" icon="pi pi-sync" disabled />
	</div>
</template>

<style scoped>

</style>
