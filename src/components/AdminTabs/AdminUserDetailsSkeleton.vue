<script setup lang="ts">
const companyUsers = Array.from({ length: 5 });
</script>

<template>
	<pv-toolbar>
		<template #start>
			<pv-button
				icon="pi pi-plus" label="Voeg toe" disabled
			/>
		</template>
	</pv-toolbar>

	<pv-data-table :value="companyUsers">
		<pv-column header="Name" style="width: 20%">
			<template #body>
				<pv-skeleton height="1.5rem" />
			</template>
		</pv-column>
		<pv-column header="Email" style="width: 20%">
			<template #body>
				<pv-skeleton height="1.5rem" />
			</template>
		</pv-column>
		<pv-column header="ID" style="width: 50%">
			<template #body>
				<pv-skeleton height="1.5rem" />
			</template>
		</pv-column>
		<pv-column header="Actions" style="width: 10%">
			<template #body>
				<pv-button icon="pi pi-trash" severity="danger" text disabled />
			</template>
		</pv-column>
	</pv-data-table>

	<pv-confirm-dialog />
</template>

<style scoped>

</style>
