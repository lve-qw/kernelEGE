<template>
  <div class="container">
    <MaterialCard>
      <template #header>Загрузка материалов ФИПИ/Сборники</template>
      <div class="upload-area" @dragover.prevent @drop.prevent="handleDrop">
        <p>Перетащите файлы сюда или</p>
        <input type="file" ref="fileInput" @change="handleFileSelect" hidden />
        <MaterialButton @click="$refs.fileInput.click()">Выбрать файл</MaterialButton>
      </div>
      <div class="file-list mt-2">
        <div v-for="f in files" :key="f.path" class="file-item">📄 {{ f.name }}</div>
        <p v-if="!files.length" class="text-muted">Файлы не загружены</p>
      </div>
    </MaterialCard>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { uploadMaterial, getUploadedMaterials, saveUploadedFile } from '../api/client';
import MaterialCard from '../components/MaterialCard.vue'; import MaterialButton from '../components/MaterialButton.vue';
const files = ref(getUploadedMaterials()); const loading = ref(false); const fileInput = ref(null);
function handleDrop(e) { if(e.dataTransfer.files.length) processFile(e.dataTransfer.files[0]); }
function handleFileSelect(e) { if(e.target.files.length) processFile(e.target.files[0]); }
async function processFile(file) {
  loading.value = true;
  try {
    const res = await uploadMaterial(file);
    const info = { name: file.name, path: res.file_path };
    files.value.push(info); saveUploadedFile(info);
  } catch(e) { alert('Ошибка загрузки: ' + e.message); } finally { loading.value = false; }
}
</script>
<style scoped>
.upload-area { border: 2px dashed var(--border); padding: 30px; text-align: center; border-radius: var(--radius); background: var(--bg-surface); }
.file-list { display: flex; flex-direction: column; gap: 8px; } .file-item { padding: 8px 12px; background: var(--bg-main); border-radius: 8px; }
</style>
