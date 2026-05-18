<template>
  <div class="container">
    <MaterialCard>
      <h2>Настройка обучения</h2>
      <form @submit.prevent="handleSave" class="form">
        <select v-model="form.exam_type" class="select"><option value="ЕГЭ">ЕГЭ</option><option value="ОГЭ">ОГЭ</option></select>
        <input v-model="form.subject" class="input" placeholder="Предмет (напр. Физика)" required />
        <input v-model="form.deadline" class="input" placeholder="Дата экзамена (ДД.ММ.ГГГГ)" />
        <textarea v-model="form.preferences" class="textarea" placeholder="Предпочтения: темп, формат, сложные темы..."></textarea>
        <MaterialButton type="submit" :loading="loading">Сохранить и продолжить</MaterialButton>
      </form>
    </MaterialCard>
  </div>
</template>
<script setup>
import { ref } from 'vue'; import { useRouter } from 'vue-router';
import { savePreferences } from '../api/client';
import MaterialCard from '../components/MaterialCard.vue'; import MaterialButton from '../components/MaterialButton.vue';
const router = useRouter(); const loading = ref(false);
const form = ref({ exam_type: 'ЕГЭ', subject: '', deadline: '', preferences: '' });
async function handleSave() {
  loading.value = true;
  try { await savePreferences(form.value); router.push('/plan'); } catch(e) { alert(e.message); } finally { loading.value = false; }
}
</script>
<style scoped> .form { display: flex; flex-direction: column; gap: 12px; } </style>

