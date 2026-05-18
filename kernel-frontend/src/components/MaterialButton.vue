<template>
  <button class="btn" :disabled="disabled || loading">
    <span v-if="loading" class="spinner"></span>
    <slot v-else></slot>
  </button>
</template>
<script setup>
defineProps({ disabled: Boolean, loading: Boolean })
</script>
<style scoped>
.btn {
  background: var(--primary);
  color: #fff;
  border: none;
  padding: 12px 24px;
  border-radius: 10px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s, transform 0.1s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
.btn:hover:not(:disabled) { background: var(--primary-hover); }
.btn:active:not(:disabled) { transform: scale(0.98); }
.btn:disabled { opacity: 0.6; cursor: not-allowed; }
.spinner {
  width: 16px; height: 16px;
  border: 2px solid #fff;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
</style>
