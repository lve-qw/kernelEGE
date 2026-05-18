<template>
  <div class="container text-center mt-2">
    <MaterialCard>
      <h2>Добро пожаловать в Kernel</h2>
      <p class="text-muted">Подготовка к ЕГЭ/ОГЭ с AI-репетитором</p>
      <form @submit.prevent="handleAuth" class="form mt-2">
        <input v-model="email" class="input" placeholder="Email" type="email" required />
        <input v-model="password" class="input mt-2" placeholder="Пароль" type="password" required />
        <MaterialButton type="submit" :loading="loading">{{ isLogin ? 'Войти' : 'Зарегистрироваться' }}</MaterialButton>
      </form>
      <p class="mt-2" @click="isLogin = !isLogin" style="cursor:pointer; color:var(--primary)">{{ isLogin ? 'Нет аккаунта? Регистрация' : 'Уже есть аккаунт? Войти' }}</p>
    </MaterialCard>
  </div>
</template>
<script setup>
import { ref } from 'vue'; import { useRouter } from 'vue-router';
import { register, login } from '../api/client';
import MaterialCard from '../components/MaterialCard.vue'; import MaterialButton from '../components/MaterialButton.vue';
const isLogin = ref(false); const email = ref(''); const password = ref(''); const loading = ref(false); const router = useRouter();
async function handleAuth() {
  loading.value = true;
  try {
    await (isLogin.value ? login : register)(email.value, password.value);
    router.push('/onboarding');
  } catch(e) { alert(e.message); } finally { loading.value = false; }
}
</script>
<style scoped> .text-muted { color: var(--text-muted); } .form { display: flex; flex-direction: column; gap: 12px; } </style>
