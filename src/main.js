import Vue from 'vue'
import { initializeApp } from 'firebase/app'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap'
import 'jquery/src/jquery.js'
import { configureDatabase } from './firestore'

Vue.config.productionTip = false

const dbConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DB_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJ_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_MESSAGE_APP_ID
}

const firebaseApp = initializeApp(dbConfig)

Vue.prototype.$firestore = configureDatabase(firebaseApp)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
