import firebase from 'firebase/app'
import 'firebase/firestore'

export const getDatabase = () => {
  const db = firebase.firestore()

  if (process.env.VUE_APP_FIREBASE_HOST === 'emulator') {
    console.info('Connecting to Firebase emulator...')
    db.useEmulator('localhost', 8050)
  }
  return db
}
