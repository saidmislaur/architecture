<template>
     <div class="projectCard">
        <img :src="image" :alt="title" />
        <div class="projectCard__caption">
            <h3>{{ title }}</h3>
            <p>{{ description }}</p>
        </div>
    </div>
</template>
<script setup lang="ts">
const props = defineProps({
    image: String,
    title: String,
    description: String
})
</script>

<style lang="scss">
.projectCard {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #f6f6f6;
    border-radius: 10px;
    overflow: hidden;
    height: 500px;
    transition: 0.3s ease;
    cursor: pointer;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    &__caption {
        margin-top: 1rem;
        h3 {
            font-size: 1.25rem;
            margin-bottom: 0.5rem;
        }
        p {
            color: #555;
            font-size: 0.95rem;
        }
    }
    &:hover {
        transform: translateY(-5px);
    }
}
</style>