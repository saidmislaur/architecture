<template>
    <div class="home">
        <Header />
        <MainSection />
        <AboutSection />
        <PortfolioSection />
        <ContactSection />
    </div>
</template>

<script setup lang="ts">
import MainSection from '../components/MainSection.vue';
import AboutSection from '../components/AboutSection.vue';
import PortfolioSection from '../components/PortfolioSection.vue';
import ContactSection from '../components/ContactSection.vue'
import Header from '../components/Header.vue';
</script>