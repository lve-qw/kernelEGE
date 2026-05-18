<template>
  <div class="mermaid-wrapper" ref="container"></div>
</template>
<script setup>
import { ref, watch } from 'vue';
import mermaid from 'mermaid';

/* Инициализация mermaid с отключённым авто-рендером */
mermaid.initialize({ startOnLoad: false, theme: 'base' });

const props = defineProps({ code: String });
const container = ref(null);

/* Перерисовка графа при изменении кода */
watch(() => props.code, async (newCode) => {
  if (!container.value || !newCode) return;
  container.value.innerHTML = '';
  try {
    const id = 'graph-' + Date.now();
    const { svg } = await mermaid.render(id, newCode);
    container.value.innerHTML = svg;
  } catch (e) {
    container.value.innerHTML = '<p style="color:var(--text-muted)">Ошибка рендеринга графа</p>';
  }
});
</script>
<style scoped>
.mermaid-wrapper {
  background: var(--bg-surface);
  padding: 16px;
  border-radius: var(--radius);
  box-shadow: var(--shadow-1);
  overflow: auto;
  text-align: center;
}
:deep(svg) { max-width: 100%; height: auto; }
</style>
