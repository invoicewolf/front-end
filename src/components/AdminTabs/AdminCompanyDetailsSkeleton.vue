<script setup lang="ts">
import BaseForm from "@/components/Forms/BaseForm.vue";
import TextInputSkeleton from "@/components/TextInputSkeleton.vue";
import vCapitalize from "@/directives/capitalize";
</script>

<template>
	<div class="flex max-w-sm flex-col gap-6">
		<BaseForm add-required-explanation>
			<template #form>
				<TextInputSkeleton
					id="companyName"
					:label="$t('companyDetails.labels.companyName')"
					required
					skeleton
				/>

				<TextInputSkeleton
					id="companyEmail"
					:label="$t('companyDetails.labels.email')"
					required
					skeleton
				/>

				<TextInputSkeleton
					id="companyNumber"
					:label="$t('companyDetails.labels.companyNumber')"
					:description="$t('companyDetails.descriptions.notAddingCompanyNumber')"
					skeleton
				/>

				<TextInputSkeleton
					id="taxNumber"
					v-capitalize
					:label="$t('companyDetails.labels.taxNumber')"
					:description="$t('companyDetails.descriptions.notAddingTaxNumber')"
					skeleton
				/>

				<div class="grid grid-cols-2 gap-2">
					<TextInputSkeleton
						id="zipCode"
						:label="$t('addressDetails.labels.zipCode')"
						required
						skeleton
					/>

					<TextInputSkeleton
						id="houseNumber"
						class="items-end"
						:label="$t('addressDetails.labels.houseNumber')"
						required
						skeleton
						skeleton-width="6rem"
					/>
				</div>

				<TextInputSkeleton
					id="addition"
					:label="$t('addressDetails.labels.addition')"
					skeleton-width="6rem"
					skeleton
				/>

				<TextInputSkeleton
					id="streetName"
					:label="$t('addressDetails.labels.streetName')"
					required
					skeleton
				/>

				<TextInputSkeleton
					id="city"
					:label="$t('addressDetails.labels.city')"
					required
					skeleton
				/>

				<TextInputSkeleton
					id="country"
					:label="$t('addressDetails.labels.country')"
					required
					skeleton
				/>
			</template>
		</BaseForm>
		<pv-button :label="$t('admin.companyDetails.buttons.update')" icon="pi pi-sync" disabled />
	</div>
</template>
