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
    transition: all 0.1s ease-out;
}

.v-enter-from {
    transform: translateX(30px);
    opacity: 0;
    overflow: hidden;
}

.v-leave-to {
    transform: translateX(-30px);
    opacity: 0;
    overflow: hidden;
}
</style>
