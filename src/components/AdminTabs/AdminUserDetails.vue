<script setup lang="ts">
import { useConfirm } from "primevue/useconfirm";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import TextInput from "@/components/TextInput.vue";
import { useProfileStore } from "@/stores/useProfileStore";
import type { User } from "@/utils/api/models/User";
import {
	type GetCurrentCompanyUsersResponse,
	createCurrentCompanyUser,
	deleteCurrentCompanyUser,
	getCurrentCompanyUsers,
} from "@/utils/client";

const companyUsers = ref<GetCurrentCompanyUsersResponse>([]);

const i18n = useI18n();

async function getCompanyUsers() {
	const req = await getCurrentCompanyUsers();

	if (!req.data) {
		return;
	}

	companyUsers.value = req.data;
}

await getCompanyUsers();

const profileStore = useProfileStore();

// IF IT DOES NOT EXIST: Fetch await to show suspense, else fetch without await.
if (!profileStore.profile.user.id) {
	await profileStore.get();
}
else {
	profileStore.get();
}

const { profile } = profileStore;

const visible = ref(false);

const userId = ref("");

async function addUser() {
	const req = await createCurrentCompanyUser({ body: { userId: userId.value } });

	if (req.data) {
		visible.value = false;
		await getCompanyUsers();
	}
}

async function deleteUser(user: User) {
	const req = await deleteCurrentCompanyUser({ path: { userId: user.id } });

	if (req.data) {
		visible.value = false;
		await getCompanyUsers();
	}
}

const confirm = useConfirm();

function confirmDeletion(user: User) {
	confirm.require({
		message: `${i18n.t("admin.users.dialogs.removeDialog.message", { firstName: user.firstName, lastName: user.lastName })}`,
		header: i18n.t("admin.users.dialogs.removeDialog.header"),
		icon: "pi pi-exclamation-triangle",
		rejectProps: {
			label: i18n.t("admin.users.buttons.cancel"),
			severity: "secondary",
			outlined: true,
		},
		acceptProps: {
			label: i18n.t("admin.users.buttons.delete"),
			severity: "danger",
		},
		accept: () => {
			deleteUser(user);
		},
	});
}
</script>

<template>
	<pv-dialog v-model:visible="visible" modal :header="$t('admin.users.dialogs.addUserDialog.header')" :style="{ width: '25rem' }">
		<TextInput
			id="userId" v-model="userId" :label="$t('admin.users.dialogs.addUserDialog.labels.userId')"
			:description="$t('admin.users.dialogs.addUserDialog.descriptions.userId')"
		/>
		<div class="flex justify-end gap-2" />
		<template #footer>
			<pv-button type="button" :label="$t('admin.users.buttons.cancel')" severity="secondary" @click="visible = false" />
			<pv-button type="button" :label="$t('admin.users.buttons.add')" @click="addUser" />
		</template>
	</pv-dialog>

	<pv-toolbar>
		<template #start>
			<pv-button
				icon="pi pi-plus" :label="$t('admin.users.buttons.add')" @click="visible = true"
			/>
		</template>
	</pv-toolbar>

	<pv-data-table :value="companyUsers">
		<pv-column :header="$t('admin.users.table.name')" field="user" style="width: 20%">
			<template #body="{ data, field }">
				{{ data[field].firstName }} {{ data[field].lastName }}
			</template>
		</pv-column>
		<pv-column :header="$t('admin.users.table.email')" field="user.email" style="width: 20%" />
		<pv-column :header="$t('admin.users.table.id')" field="user.id" style="width: 50%" />
		<pv-column :header="$t('admin.users.table.actions')" style="width: 10%">
			<template #body="{ data }">
				<pv-button
					v-if="profile.user.id !== data.user.id" icon="pi pi-trash" severity="danger" text
					@click="confirmDeletion(data.user)"
				/>
			</template>
		</pv-column>
	</pv-data-table>

	<pv-confirm-dialog />
</template>

<style scoped>

</style>
