<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

const i18n = useI18n();

const languageSelectorOptions = [{
	name: "English",
	locale: "en",
	icon: "https://flagsapi.com/GB/flat/24.png",
}, {
	name: "Dutch",
	locale: "nl",
	icon: "https://flagsapi.com/NL/flat/24.png",
}];

const locale = ref(i18n.locale.value);

watch(locale, () => {
	i18n.locale.value = locale.value;
	localStorage.setItem("locale", locale.value);
});

const getLocaleOption = computed(() => {
	return languageSelectorOptions.find(option => option.locale === i18n.locale.value) || {
		locale: "English",
		name: "en",
		icon: "https://flagsapi.com/GB/flat/24.png",
	};
});
</script>

<template>
	<pv-select
		v-model="locale"
		class="w-40"
		:options="languageSelectorOptions" option-label="name" option-value="locale"
		placeholder="Select a language"
	>
		<template #option="{ option }">
			<span class="flex gap-1">
				<img :alt="option.name" :src="option.icon">
				<span>{{ option.name }}</span>
			</span>
		</template>

		<template #value="{ value, placeholder }">
			<div v-if="value">
				<span class="flex gap-1">
					<img
						:alt="getLocaleOption.name"
						:src="getLocaleOption.icon"
					>
					<span>{{ getLocaleOption.name }}</span>
				</span>
			</div>
			<div v-else>
				<span>{{ placeholder }}</span>
			</div>
		</template>
	</pv-select>
</template>

<style scoped>

</style>
