
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { createVuestic } from 'vuestic-ui'


// VeeValidate konfigürasyonu (isteğe bağlı ek ayarlar)
import { configure } from 'vee-validate'

configure({
  // validateOnChange: true gibi global ayarlar yapabilirsiniz
})
import './styles/tailwind.css'
import 'vuestic-ui/dist/vuestic-ui.css' // Vuestic UI stilleri

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.use(createVuestic())
app.mount('#app')