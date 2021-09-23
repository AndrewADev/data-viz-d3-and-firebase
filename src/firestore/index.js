import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'

// Conversion (here and elsewhere), see: https://firebase.google.com/docs/web/modular-upgrade#example_2_refactoring_a_function
export const getDatabase = () => {
  const db = firebase.firestore()

  if (process.env.VUE_APP_FIREBASE_BACKEND === 'emulator') {
    // eslint-disable-next-line no-console
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
