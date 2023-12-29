import Vue, { createApp } from 'vue'
import { initializeApp } from 'firebase/app'
import App from './App.vue'
import { router } from '@/router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap'
import 'jquery'
import { configureDatabase } from './firestore'

Vue.config.productionTip = false

const dbConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DB_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJ_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGE_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_MESSAGE_APP_ID
}

const firebaseApp = initializeApp(dbConfig)

Vue.prototype.$firestore = configureDatabase(firebaseApp)

const app = createApp(App)
app.use(router)
app.mount('#app')
