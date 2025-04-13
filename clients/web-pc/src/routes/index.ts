import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

import StartPage from 'src/pages/Start/index.vue'
import SheetPage from 'src/pages/Sheet/index.vue'

const routes: RouteRecordRaw[] = [
  { path: '/', component: StartPage },
  { path: '/sheet', component: SheetPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
