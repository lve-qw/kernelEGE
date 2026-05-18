<template>
  <div class="container grid">
    <MaterialCard>
      <template #header>Подбор заданий из сборников</template>
      <form @submit.prevent="handleGenerate" class="form">
        <input v-model="topic" class="input" placeholder="Тема для практики" required />
        <select v-model="filePath" class="select">
          <option value="">Без привязки к файлу</option>
          <option v-for="f in files" :key="f.path" :value="f.path">{{ f.name }}</option>
        </select>
        <MaterialButton type="submit" :loading="loading">Найти задачи</MaterialButton>
      </form>
    </MaterialCard>
    <MaterialCard v-if="tasks.length">
      <template #header>Задания</template>
      <div v-for="(t, i) in tasks" :key="i" class="task">
        <strong>№{{ i+1 }}:</strong> <span v-html="t"></span>
      </div>
    </MaterialCard>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue';
import { generatePractice, getUploadedMaterials } from '../api/client';
import MaterialCard from '../components/MaterialCard.vue'; import MaterialButton from '../components/MaterialButton.vue';
const files = computed(() => getUploadedMaterials()); const topic = ref(''); const filePath = ref(''); const loading = ref(false); const tasks = ref([]);
async function handleGenerate() {
  loading.value = true;
  try {
    const res = await generatePractice(topic.value, filePath.value);
    tasks.value = res.tasks || [res.task_content]; // Ожидаем массив или строку
  } catch(e) { alert(e.message); } finally { loading.value = false; }
}
</script>
<style scoped> .form { display: flex; flex-direction: column; gap: 12px; } .task { margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid var(--border); } </style>
