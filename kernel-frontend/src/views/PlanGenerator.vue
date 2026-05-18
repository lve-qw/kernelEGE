<template>
  <div class="container grid">
    <MaterialCard>
      <template #header>Генерация плана обучения</template>
      <form @submit.prevent="handleGenerate" class="form">
        <input v-model="form.subject" class="input" placeholder="Предмет (напр. Математика)" required />
        <select v-model="form.exam_type" class="input">
          <option value="ЕГЭ">ЕГЭ</option>
          <option value="ОГЭ">ОГЭ</option>
        </select>
        <input v-model="form.deadline" class="input" placeholder="Дата экзамена (ДД.ММ.ГГГГ)" />
        <textarea v-model="form.weak_points" class="textarea" placeholder="Пробелы в знаниях (через запятую)"></textarea>
        <MaterialButton type="submit" :loading="loading">Построить план</MaterialButton>
      </form>
    </MaterialCard>

    <MaterialCard v-if="plan.mermaid_structure">
      <template #header>Визуализация плана</template>
      <MermaidViewer :code="plan.mermaid_structure" />
      <p class="explanation">{{ plan.raw_explanation }}</p>
    </MaterialCard>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { generatePlan } from '../api/client';
import MaterialCard from '../components/MaterialCard.vue';
import MaterialButton from '../components/MaterialButton.vue';
import MermaidViewer from '../components/MermaidViewer.vue';

const form = ref({ subject: '', exam_type: 'ЕГЭ', deadline: '', weak_points: '' });
const loading = ref(false);
const plan = ref({ mermaid_structure: '', raw_explanation: '' });

async function handleGenerate() {
  loading.value = true;
  try {
    plan.value = await generatePlan(form.value);
  } catch (e) { alert('Ошибка генерации: ' + e.message); } finally { loading.value = false; }
}
</script>

<style scoped>
.form { display: flex; flex-direction: column; gap: 12px; }
.explanation { margin-top: 16px; color: var(--text-muted); white-space: pre-wrap; }
</style>
