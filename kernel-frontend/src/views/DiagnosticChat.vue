<template>
  <div class="container">
    <MaterialCard>
      <template #header>Диагностический чат с AI</template>
      <div class="chat-area">
        <div v-for="(msg, i) in messages" :key="i" :class="['message', msg.role]">
          {{ msg.text }}
        </div>
        <div v-if="isStreaming" class="message ai typing">Анализирую...</div>
      </div>
      <div class="chat-input">
        <input v-model="topic" class="input topic-input" placeholder="Тема анализа" />
        <input v-model="userInput" class="input" @keyup.enter="sendMessage" placeholder="Напишите сообщение..." />
        <MaterialButton @click="sendMessage" :disabled="isStreaming || !userInput.trim()">Отправить</MaterialButton>
      </div>
    </MaterialCard>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { streamChat } from '../api/client';
import MaterialCard from '../components/MaterialCard.vue';
import MaterialButton from '../components/MaterialButton.vue';

const messages = ref([]);
const userInput = ref('');
const topic = ref('');
const isStreaming = ref(false);

function sendMessage() {
  if (!userInput.value.trim()) return;
  const text = userInput.value;
  messages.value.push({ role: 'user', text });
  userInput.value = '';
  isStreaming.value = true;

  let currentMsg = { role: 'ai', text: '' };
  messages.value.push(currentMsg);

  streamChat(
    text, topic.value,
    (chunk) => { currentMsg.text += chunk; },
    () => { isStreaming.value = false; },
    (err) => { isStreaming.value = false; alert('Ошибка: ' + err); }
  );
}
</script>

<style scoped>
.chat-area {
  height: 300px;
  overflow-y: auto;
  background: var(--bg-main);
  border-radius: 10px;
  padding: 12px;
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.message {
  max-width: 80%;
  padding: 10px 14px;
  border-radius: 12px;
  line-height: 1.4;
}
.message.user {
  background: var(--secondary);
  color: #1A1A1A;
  align-self: flex-end;
}
.message.ai {
  background: var(--bg-surface);
  border: 1px solid var(--border);
  align-self: flex-start;
}
.chat-input { display: flex; gap: 8px; }
.topic-input { flex: 1; }
</style>
