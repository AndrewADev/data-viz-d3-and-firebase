import { getFirestore, connectFirestoreEmulator, initializeFirestore } from 'firebase/firestore'

export const configureDatabase = (app) => {
  let db

  if (import.meta.env.VITE_FIREBASE_BACKEND === 'emulator') {
    // eslint-disable-next-line no-console
    console.info('Connecting to Firebase emulator...')

    // Needed due to Cypress, in order to keep communication open to Firebase with
    // Cypress in the middle, per first comment here: https://stackoverflow.com/a/61619639
    // Documentation on setting available here:
    //   https://firebase.google.com/docs/reference/js/firebase.firestore.Settings#optional-experimentalautodetectlongpolling
    db = initializeFirestore(app, { experimentalAutoDetectLongPolling: true })
    connectFirestoreEmulator(db, 'localhost', 8050)
  } else {
    db = getFirestore(app)
  }
  return db
}
