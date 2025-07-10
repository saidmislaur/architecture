<template>
    <button class="btn">{{ value }}</button>
</template>

<script setup>
const props = defineProps({
    value: String,
})
</script>

<style lang="scss">
.btn {
    background: #333;
    color: white;
    border: none;
    padding: 1rem 2rem;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.3s ease;

    &:hover {
      background: #555;
    }
}
</style>