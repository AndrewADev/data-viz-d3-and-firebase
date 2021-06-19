import firebase from 'firebase/app'
import 'firebase/firestore'

export const getDatabase = ({ useEmulator = false } = {}) => {
  const db = firebase.firestore()
  if (useEmulator) {
    db.useEmulator('localhost', 8050)
  }
  return db
}
