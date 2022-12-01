import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import axios from 'axios'
import './mock/index.js'

axios.interceptors.request.use(config => {
  // config.params.Authorization = 'Connie ' + localStorage.getItem('token')
  return config
})
const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
