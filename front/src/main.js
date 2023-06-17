import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueGtag from 'vue-gtag'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
// config: { id: 'G-BNLXHSPF7L' }

app.use(VueGtag, {
    config: { id: 'G-BNLXHSPF7L' },
    router,
    enabled: true,
});

app.mount('#app')
