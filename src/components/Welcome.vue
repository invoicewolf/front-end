<script lang="ts" setup>
import InvoiceWolfNameLogo from "@/components/InvoiceWolfNameLogo.vue";
import { useProfileStore } from "@/stores/useProfileStore";

const profileStore = useProfileStore();

// IF IT DOES NOT EXIST: Fetch await to show suspense, else fetch without await.
if (!profileStore.profile.user.id) {
	await profileStore.get();
}
else {
	profileStore.get();
}

const { profile } = profileStore;
</script>

<template>
	<main class="flex size-full justify-center">
		<pv-card class="p-20">
			<template #content>
				<div class="flex flex-col items-center justify-center gap-4 text-center">
					<InvoiceWolfNameLogo arrangement="vertical" size="large" />

					<pv-divider />

					<span class="text-4xl font-bold">{{ $t('home.hello', { user: profile.user.firstName }) }}</span>
					<span>{{ $t('home.pressButtonToStart') }}</span>

					<router-link to="/create-invoice">
						<pv-button :label="$t('home.createInvoiceButton')" icon="pi pi-plus" />
					</router-link>
				</div>
			</template>
		</pv-card>
	</main>
</template>
