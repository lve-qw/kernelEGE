<template>
  <div class="card">
    <div v-if="$slots.header" class="card-header"><slot name="header"></slot></div>
    <div class="card-body"><slot></slot></div>
  </div>
</template>
<script setup>
/* Универсальная карточка с тенями Material Design */
</script>
<style scoped>
.card {
  background: var(--bg-surface);
  border-radius: var(--radius);
  box-shadow: var(--shadow-1);
  overflow: hidden;
  transition: box-shadow 0.2s;
}
.card:hover { box-shadow: var(--shadow-2); }
.card-header { padding: 16px 20px 0; font-weight: 600; font-size: 18px; }
.card-body { padding: 16px 20px 20px; }
</style>
