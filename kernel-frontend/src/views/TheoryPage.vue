<template>
  <div class="container grid">
    <MaterialCard>
      <template #header>Генерация теории</template>
      <form @submit.prevent="handleGenerate" class="form">
        <input v-model="topic" class="input" placeholder="Тема (напр. Производные)" required />
        <select v-model="filePath" class="select">
          <option value="">Без привязки к файлу</option>
          <option v-for="f in files" :key="f.path" :value="f.path">{{ f.name }}</option>
        </select>
        <MaterialButton type="submit" :loading="loading">Сгенерировать</MaterialButton>
      </form>
    </MaterialCard>
    <MaterialCard v-if="theoryContent">
      <template #header>Результат</template>
      <div class="content" v-html="theoryContent"></div>
    </MaterialCard>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue';
import { generateTheory, getUploadedMaterials } from '../api/client';
import MaterialCard from '../components/MaterialCard.vue'; import MaterialButton from '../components/MaterialButton.vue';
const files = computed(() => getUploadedMaterials()); const topic = ref(''); const filePath = ref(''); const loading = ref(false); const theoryContent = ref('');
async function handleGenerate() {
  loading.value = true;
  try {
    const res = await generateTheory(topic.value, filePath.value);
    theoryContent.value = res.theory_content.replace(/\n/g, '<br>');
  } catch(e) { alert(e.message); } finally { loading.value = false; }
}
</script>
<style scoped> .form { display: flex; flex-direction: column; gap: 12px; } .content { white-space: pre-wrap; line-height: 1.6; } </style>
