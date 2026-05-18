<template>
  <div class="container grid">
    <MaterialCard>
      <template #header>
        <h2>Генерация и корректировка плана</h2>
      </template>
      <form @submit.prevent="handleGenerate" class="form">
        <div class="row">
          <input v-model="prefs.subject" class="input" placeholder="Предмет" />
          <select v-model="prefs.exam_type" class="select">
            <option value="ЕГЭ">ЕГЭ</option>
            <option value="ОГЭ">ОГЭ</option>
          </select>
        </div>
        <input v-model="prefs.deadline" class="input" placeholder="Дата экзамена (ДД.ММ.ГГГГ)" />
        <textarea v-model="adjustments" class="textarea" placeholder="Корректировки: ускорить тему X, добавить повторение Y..."></textarea>
        <MaterialButton type="submit" :loading="loading">Построить/Обновить план</MaterialButton>
      </form>
    </MaterialCard>

    <MaterialCard v-if="plan.mermaid_structure">
      <template #header>
        <h2>Визуализация</h2>
      </template>
      <MermaidViewer :code="plan.mermaid_structure" />
      <div class="explanation" v-html="plan.raw_explanation.replace(/\n/g, '<br>')"></div>
    </MaterialCard>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { generatePlan } from '../api/client';
import MaterialCard from '../components/MaterialCard.vue';
import MaterialButton from '../components/MaterialButton.vue';
import MermaidViewer from '../components/MermaidViewer.vue';

const prefs = ref({ subject: 'Математика', exam_type: 'ЕГЭ', deadline: '' });
const adjustments = ref('');
const loading = ref(false);
const plan = ref({ mermaid_structure: '', raw_explanation: '' });

/* Загружаем предпочтения, сохранённые на этапе онбординга */
onMounted(() => {
  const saved = localStorage.getItem('userPrefs');
  if (saved) prefs.value = { ...prefs.value, ...JSON.parse(saved) };
});

async function handleGenerate() {
  loading.value = true;
  try {
    plan.value = await generatePlan({
      subject: prefs.value.subject,
      exam_type: prefs.value.exam_type,
      deadline: prefs.value.deadline,
      weak_points: '',
      adjustments: adjustments.value
    });
  } catch(e) {
    alert('Ошибка генерации: ' + e.message);
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.form { display: flex; flex-direction: column; gap: 12px; }
.row { display: grid; grid-template-columns: 2fr 1fr; gap: 12px; }
.explanation { margin-top: 16px; color: var(--text-muted); line-height: 1.5; }
</style>
