<template>
  <header v-if="showNav" class="navbar">
    <div class="container nav-content">
      <RouterLink to="/plan" class="logo">Kernel</RouterLink>
      <nav class="nav-links">
        <RouterLink to="/materials">Материалы</RouterLink>
        <RouterLink to="/theory">Теория</RouterLink>
        <RouterLink to="/practice">Практика</RouterLink>
        <RouterLink to="/chat">Чат</RouterLink>
      </nav>
    </div>
  </header>
  <main><RouterView /></main>
</template>
<script setup>
import { computed } from 'vue'; import { RouterView, RouterLink, useRoute } from 'vue-router';
const route = useRoute();
const showNav = computed(() => !['/', '/onboarding'].includes(route.path));
</script>
<style scoped>
.navbar { background: var(--bg-surface); box-shadow: var(--shadow-1); padding: 12px 0; position: sticky; top: 0; z-index: 10; }
.nav-content { display: flex; justify-content: space-between; align-items: center; }
.logo { font-weight: 700; font-size: 20px; color: var(--primary); text-decoration: none; }
.nav-links { display: flex; gap: 16px; }
.nav-links a { text-decoration: none; color: var(--text-main); font-weight: 500; padding: 4px 0; transition: 0.2s; }
.nav-links a:hover, .nav-links a.router-link-active { color: var(--primary); border-bottom: 2px solid var(--primary); }
</style>
