import Vue from 'vue'
import firebase from 'firebase/compat/app'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap'
import 'jquery/src/jquery.js'
import { getDatabase } from './firestore'

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
// The legacy method initializes both legacy and module versions, so
// we will migrate this last, see: https://firebase.google.com/docs/web/modular-upgrade#update_initialization_code
firebase.initializeApp(dbConfig)

Vue.prototype.$firestore = getDatabase()

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
