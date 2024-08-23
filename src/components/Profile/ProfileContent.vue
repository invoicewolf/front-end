<script lang="ts" setup>
import { useClipboard } from "@vueuse/core";
import {
	EmailAuthProvider,
	getAuth,
	reauthenticateWithCredential,
	updatePassword,
	verifyBeforeUpdateEmail,
} from "firebase/auth";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import {
	type UserDto,
	deleteCurrentUser,
	getCurrentUser,
	updateCurrentUser,
} from "@/utils/client";
import TextInput from "@/components/TextInput.vue";
import { useProfileStore } from "@/stores/useProfileStore";
import { getRoles } from "@/utils/authorizationHelper";
import { debounce } from "@/utils/helpers/debounce";

const router = useRouter();

const profileStore = useProfileStore();

// IF IT DOES NOT EXIST: Fetch await to show suspense, else fetch without await.
if (!profileStore.profile.user.id) {
	await profileStore.get();
}
else {
	profileStore.get();
}

const { profile } = profileStore;

const toast = useToast();
const i18n = useI18n();

async function deleteUser() {
	await deleteCurrentUser();

	localStorage.removeItem("access_token");

	toast.add({ severity: "success", summary: i18n.t("profile.toast.deleted.summary"), detail: i18n.t("profile.toast.deleted.detail"), life: 5000 });

	await router.push("/login");
}

const confirm = useConfirm();

function confirmDeletion() {
	confirm.require({
		message: "Are you sure you want to delete your account?",
		header: "Danger",
		icon: "pi pi-exclamation-triangle",
		rejectProps: {
			label: "Cancel",
			severity: "secondary",
			outlined: true,
		},
		acceptProps: {
			label: "Delete",
			severity: "danger",
		},
		accept: () => {
			deleteUser();
		},
	});
}

const { copy } = useClipboard({ source: profile.user.id });

const currentPassword = ref("");
const newPassword = ref("");
const confirmNewPassword = ref("");

const invalidPassword = ref(true);

const handlePasswordValidation = debounce(() => {
	invalidPassword.value = newPassword.value === confirmNewPassword.value;
}, 500);

const auth = getAuth();

const updateButtonLoading = ref(false);

async function updateProfile() {
	updateButtonLoading.value = true;

	if (!currentPassword.value) {
		updateButtonLoading.value = false;
		return;
	}

	const req = await getCurrentUser();

	if (!req.data) {
		updateButtonLoading.value = false;
		return;
	}

	const existingUserFromDb = req.data;

	if (profile.user.email !== existingUserFromDb.email) {
		await updateFirebaseEmail(existingUserFromDb);
	}

	if (newPassword.value.length > 0 && confirmNewPassword.value.length > 0) {
		await updateFirebasePassword(existingUserFromDb);
	}

	await updateCurrentUser({ body: {
		firstName: profile.user.firstName,
		lastName: profile.user.lastName,
		email: profile.user.email,
	} });

	toast.add({
		severity: "success",
		summary: i18n.t("profile.toast.updated.summary"),
		detail: i18n.t("profile.toast.updated.detail"),
		life: 5000,
	});

	updateButtonLoading.value = false;

	localStorage.removeItem("access_token");
	await router.push("/login");
}

async function updateFirebaseEmail(currentUser: UserDto) {
	if (!invalidPassword.value) {
		return;
	}

	const user = auth.currentUser;

	if (!user) {
		return;
	}

	const authCredential = EmailAuthProvider.credential(currentUser.email, currentPassword.value);

	await reauthenticateWithCredential(user, authCredential);

	await verifyBeforeUpdateEmail(user, profile.user.email);

	toast.add({ severity: "info", summary: i18n.t("profile.toast.updatedEmail.summary"), detail: i18n.t("profile.toast.updatedEmail.detail"), life: 5000 });
}

async function updateFirebasePassword(currentUser: UserDto) {
	if (!invalidPassword.value) {
		return;
	}

	const user = auth.currentUser;

	if (!user) {
		return;
	}

	const authCredential = EmailAuthProvider.credential(currentUser.email, currentPassword.value);

	await reauthenticateWithCredential(user, authCredential);

	await updatePassword(user, newPassword.value);

	toast.add({ severity: "success", summary: i18n.t("profile.toast.updatedPassword.summary"), detail: i18n.t("profile.toast.updatedPassword.detail"), life: 5000 });
}
</script>

<template>
	<div>
		<pv-card class="w-[50rem]">
			<template #title>
				<span class="font-semibold">
					{{ $t("profile.profile") }}
				</span>
			</template>
			<template #header>
				<div class="flex h-40 items-center justify-center rounded-t-[var(--pv-card-border-radius)] bg-primary-100 p-4 dark:bg-primary-900">
					<pv-avatar
						shape="circle"
						class="size-28 bg-primary-500 text-5xl text-[var(--pv-button-primary-color)] drop-shadow"
						:label="`${profile.user.firstName.substring(0, 1).toUpperCase()}${profile.user.lastName.substring(0, 1).toUpperCase()}`"
					/>
				</div>
			</template>
			<template #content>
				<div class="mb-6 flex flex-row gap-4">
					<div class="flex w-full flex-col gap-6">
						<div class="grid grid-cols-2 gap-4">
							<TextInput id="firstName" v-model="profile.user.firstName" :label="$t('profile.labels.firstName')" />
							<TextInput
								id="lastName" v-model="profile.user.lastName" :label="$t('profile.labels.lastName')"
								class="text-right"
							/>
						</div>
						<div class="flex flex-col gap-2 ">
							<p class="font-medium">
								{{ $t("profile.labels.userId") }}
							</p>
							<span class="flex flex-row items-center gap-1">{{ profile.user.id }} <pv-button
								icon="pi pi-copy" aria-label="Copy to clipboard" text :pt="{
									root: {
										style: {
											height: '1.5rem',
											width: '1.5rem',
										},
									},
								}" @click="copy(profile.user.id)"
							/></span>
						</div>
						<div v-if="profile.company.companyName" class="flex flex-col gap-2">
							<p class="font-medium">
								{{ $t("profile.labels.companyName") }}
							</p>
							<span>{{ profile.company.companyName }}<span
								v-if="getRoles().includes('admin')"
							> ({{ $t("profile.owner") }})</span></span>
						</div>
					</div>

					<pv-divider layout="vertical" />

					<div class="flex w-full flex-col gap-6">
						<TextInput id="email" v-model="profile.user.email" :label="$t('profile.labels.email')" />

						<TextInput
							id="password" v-model="currentPassword" password :label="$t('profile.labels.currentPassword')"
							input-class="w-full"
						/>
						<TextInput
							id="newPassword" v-model="newPassword" password password-feedback
							:label="$t('profile.labels.newPassword')" input-class="w-full"
							@update:model-value="handlePasswordValidation"
						/>
						<TextInput
							id="confirmNewPassword" v-model="confirmNewPassword" password
							:label="$t('profile.labels.confirmNewPassword')" input-class="w-full"
							@update:model-value="handlePasswordValidation"
						/>

						<pv-message v-if="!invalidPassword" icon="pi pi-times-circle" severity="error">
							Passwords do not match
						</pv-message>
					</div>
				</div>
			</template>
			<template #footer>
				<div class="flex flex-row justify-between gap-16">
					<pv-button
						:label="$t('profile.buttons.deleteAccount')"
						severity="danger"
						class="flex-1"
						icon="pi pi-trash"
						@click="confirmDeletion"
					/>
					<pv-button
						:label="$t('profile.buttons.updateProfile')"
						class="flex-1"
						icon="pi pi-user"
						:loading="updateButtonLoading"
						@click="updateProfile"
					/>
				</div>
			</template>
		</pv-card>

		<pv-confirm-dialog />
	</div>
</template>
