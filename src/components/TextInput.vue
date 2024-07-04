<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
	label: string;
	id: string;
	required?: boolean;
	description?: string;
	labelClass?: string;
	inputClass?: string;
	toggleable?: boolean;
	visible?: boolean;
	disabled?: boolean;
	enableGroup?: boolean;
	invalid?: boolean;
	mask?: string;
	number?: boolean;
}>();

defineEmits<{
	(e: "toggled", value: boolean): void;
}>();

const visible = ref(props.visible);

const model = defineModel({ required: true, type: String });
</script>

<template>
	<div v-if="!enableGroup" class="flex flex-col gap-2">
		<label v-if="!toggleable" :for="id" class=" select-none font-medium" :class="labelClass">{{ label }}<span
			v-if="required"
			class="text-danger"
		>*</span></label>
		<span v-else class="flex w-full select-none items-center justify-between">
			<label :for="id" class="font-medium" :class="labelClass">{{ label }}<span
				v-if="required"
				class="text-danger"
			>*</span></label>
			<pv-toggle-switch
				:model-value="visible"
				@change="visible = !visible; $emit('toggled', visible)"
			/>
		</span>
		<pv-input-text
			v-if="(visible && toggleable) || (!toggleable)"
			:id="id"
			v-model="model"
			:class="inputClass"
			:disabled="disabled"
			:invalid="invalid"
		/>
		<span v-if="description" class="select-none text-sm">{{ description }}</span>
	</div>
	<div v-else class="flex flex-col gap-2">
		<label v-if="!toggleable" :for="id" class="select-none font-medium" :class="labelClass">{{ label }}<span
			v-if="required"
			class="text-danger"
		>*</span></label>
		<span v-else class="flex w-full select-none items-center justify-between">
			<label :for="id" class="font-medium" :class="labelClass">{{ label }}<span
				v-if="required"
				class="text-danger"
			>*</span></label>
			<pv-toggle-switch
				:model-value="visible"
				@change="visible = !visible; $emit('toggled', visible)"
			/>
		</span>
		<pv-input-group>
			<pv-input-mask
				v-if="(visible && toggleable) || (!toggleable) && mask"
				:id="id"
				v-model="model"
				:class="inputClass"
				:disabled="disabled"
				:invalid="invalid"
				:mask="mask"
				slot-char=""
			/>
			<pv-input-number
				v-else-if="(visible && toggleable) || (!toggleable) && number"
				:id="id"
				v-model="model"
				:class="inputClass"
				:disabled="disabled"
				:invalid="invalid"
			/>
			<pv-input-text
				v-else-if="(visible && toggleable) || (!toggleable)"
				:id="id"
				v-model="model"
				:class="inputClass"
				:disabled="disabled"
				:invalid="invalid"
			/>
			<pv-input-group-addon>
				<i v-if="!invalid" class="pi pi-check text-success" />
				<i v-else class="pi pi-times text-danger" />
			</pv-input-group-addon>
		</pv-input-group>
		<span v-if="description" class="select-none text-sm">{{ description }}</span>
	</div>
</template>

<style scoped>

</style>
