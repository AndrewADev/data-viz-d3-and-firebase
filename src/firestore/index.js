import firebase from 'firebase/app'
import 'firebase/firestore'

export const getDatabase = () => {
  const db = firebase.firestore()

  if (process.env.VUE_APP_FIREBASE_HOST === 'emulator') {
    console.info('Connecting to Firebase emulator...')
    // Needed due to Cypress, in order to keep communication open to Firebase with
    // Cypress in the middle, per first comment here: https://stackoverflow.com/a/61619639
    // Documentation on setting available here:
    //   https://firebase.google.com/docs/reference/js/firebase.firestore.Settings#optional-experimentalautodetectlongpolling
    db.settings({ experimentalAutoDetectLongPolling: true })
    db.useEmulator('localhost', 8050)
  }
  return db
}
