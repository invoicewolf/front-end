<script setup lang="ts">
defineProps<{
	label: string;
	id: string;
	required?: boolean;
	description?: string;
	labelClass?: string;
	inputClass?: string;
	visible?: boolean;
	disabled?: boolean;
	enableGroup?: boolean;
	invalid?: boolean;
	mask?: string;
	number?: boolean;
}>();

defineEmits<{
	(e: "blur"): void;
}>();

const model = defineModel({ required: true, type: String });
</script>

<template>
	<div v-if="!enableGroup" class="flex flex-col gap-2">
		<label :for="id" class=" select-none font-medium" :class="labelClass">{{ label }}<span
			v-if="required"
			class="text-danger"
		>*</span></label>
		<pv-input-mask
			v-if="mask"
			:id="id"
			v-model="model"
			:class="inputClass"
			:disabled="disabled"
			:invalid="invalid"
			:mask="mask"
			slot-char=""
			:data-cy="`${id}`"
			@blur="$emit('blur')"
		/>
		<pv-input-text
			v-else
			:id="id"
			v-model="model"
			:class="inputClass"
			:disabled="disabled"
			:invalid="invalid"
			:data-cy="`${id}`"
			@blur="$emit('blur')"
		/>
		<span v-if="description" class="select-none text-sm">{{ description }}</span>
	</div>
	<div v-else class="flex flex-col gap-2">
		<label :for="id" class="select-none font-medium" :class="labelClass">{{ label }}<span
			v-if="required"
			class="text-danger"
		>*</span></label>
		<pv-input-group :data-cy="`${id}`">
			<pv-input-mask
				v-if="mask"
				:id="id"
				v-model="model"
				:class="inputClass"
				:disabled="disabled"
				:invalid="invalid"
				:mask="mask"
				slot-char=""
				@blur="$emit('blur')"
			/>
			<pv-input-number
				v-else-if="number"
				:id="id"
				v-model="model"
				:class="inputClass"
				:disabled="disabled"
				:invalid="invalid"
				@blur="$emit('blur')"
			/>
			<pv-input-text
				v-else
				:id="id"
				v-model="model"
				:class="inputClass"
				:disabled="disabled"
				:invalid="invalid"
				@blur="$emit('blur')"
			/>
			<pv-input-group-addon>
				<i v-if="!invalid" class="pi pi-check text-success" />
				<i v-else class="pi pi-times text-danger" />
			</pv-input-group-addon>
		</pv-input-group>
		<span v-if="description" class="select-none text-sm">{{ description }}</span>
	</div>
</template>

<style>

</style>
