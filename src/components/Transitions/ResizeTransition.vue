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
    transition: all 0.075s ease-out;
}

.v-enter-from {
    transform: translateY(30px);
    overflow: hidden;
}

.v-leave-to {
    transform: translateY(-30px);
    overflow: hidden;
}
</style>
