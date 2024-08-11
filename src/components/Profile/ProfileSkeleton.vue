<script lang="ts" setup>
import TextInputSkeleton from "@/components/TextInputSkeleton.vue";
</script>

<template>
	<pv-card class="w-[50rem]">
		<template #title>
			<span class="font-semibold">
				{{ $t('profile.profile') }}
			</span>
		</template>
		<template #header>
			<div class="flex h-40 items-center justify-center rounded-t-[var(--pv-card-border-radius)] bg-primary-200 p-4 dark:bg-primary-800">
				<pv-avatar
					shape="circle"
					class="size-28 bg-primary-500 text-5xl text-[var(--pv-button-primary-color)] drop-shadow"
				/>
			</div>
		</template>
		<template #content>
			<div class="mb-6 flex flex-row gap-4">
				<div class="flex w-full flex-col gap-6">
					<div class="grid grid-cols-2 gap-4">
						<TextInputSkeleton id="firstName" :label="$t('profile.labels.firstName')" />
						<TextInputSkeleton id="lastName" :label="$t('profile.labels.lastName')" class="text-right" />
					</div>
					<div class="flex flex-col gap-2 ">
						<p class="font-medium">
							{{ $t('profile.labels.userId') }}
						</p>
						<span class="flex flex-row items-center gap-1"><pv-skeleton height="1.5rem" width="18rem" /> <pv-button
							icon="pi pi-copy" aria-label="Copy to clipboard" text :pt="{
								root: {
									style: {
										height: '1.5rem',
										width: '1.5rem',
									},
								},
							}"
						/></span>
					</div>
					<div class="flex flex-col gap-2">
						<p class="font-medium">
							{{ $t('profile.labels.companyName') }}
						</p>
						<p><pv-skeleton height="1.5rem" /></p>
					</div>
				</div>

				<pv-divider layout="vertical" />

				<div class="flex w-full flex-col gap-6">
					<TextInputSkeleton id="email" :label="$t('profile.labels.email')" />

					<TextInputSkeleton id="password" :label="$t('profile.labels.currentPassword')" input-class="w-full" />
					<TextInputSkeleton id="newPassword" :label="$t('profile.labels.newPassword')" input-class="w-full" />
					<TextInputSkeleton id="confirmNewPassword" :label="$t('profile.labels.confirmNewPassword')" input-class="w-full" />
				</div>
			</div>
		</template>
		<template #footer>
			<div class="flex flex-row justify-between gap-16">
				<pv-button :label="$t('profile.buttons.deleteAccount')" severity="danger" class="flex-1" icon="pi pi-trash" disabled />
				<pv-button :label="$t('profile.buttons.updateProfile')" class="flex-1" icon="pi pi-user" disabled />
			</div>
		</template>
	</pv-card>
</template>
