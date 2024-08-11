<script setup lang="ts">

</script>

<template>
	<Transition mode="out-in">
		<slot />
	</Transition>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
    transition: all 0.1s ease;
}

.v-enter-from {
    opacity: 50%;
    transform: scale(105%);
    overflow: hidden;
}

.v-leave-to {
    opacity: 50%;
    transform: scale(95%);
    overflow: hidden;
}
</style>
