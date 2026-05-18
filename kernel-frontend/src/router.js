import { createRouter, createWebHistory } from 'vue-router';
import AuthPage from './views/AuthPage.vue';
import OnboardingPage from './views/OnboardingPage.vue';
import PlanPage from './views/PlanPage.vue';
import TheoryPage from './views/TheoryPage.vue';
import PracticePage from './views/PracticePage.vue';
import MaterialsPage from './views/MaterialsPage.vue';
import ChatPage from './views/ChatPage.vue';

const routes = [
  { path: '/', component: AuthPage },
  { path: '/onboarding', component: OnboardingPage },
  { path: '/materials', component: MaterialsPage },
  { path: '/plan', component: PlanPage },
  { path: '/theory', component: TheoryPage },
  { path: '/practice', component: PracticePage },
  { path: '/chat', component: ChatPage },
  { path: '/:pathMatch(.*)*', redirect: '/' }
];

export const router = createRouter({ history: createWebHistory(), routes });
