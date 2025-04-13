import { createApp } from 'vue'
import App from './App.vue'
import router from './routes/index.ts'

import 'tdesign-vue-next/es/style/index.css';
import './style.css'

createApp(App)
  .use(router)
  .mount('#app')
