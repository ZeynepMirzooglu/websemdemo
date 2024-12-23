import { createRouter, createWebHistory } from 'vue-router'
import MultiStepForm from '@/pages/MultiStepForm.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: MultiStepForm
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router