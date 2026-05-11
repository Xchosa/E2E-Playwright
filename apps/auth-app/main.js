import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './index.js'
import App from './App.vue'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
