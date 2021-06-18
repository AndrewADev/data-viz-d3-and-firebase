import firebase from 'firebase/app'
import 'firebase/firestore'

export const getDatabase = () => {
  return firebase.firestore()
}
