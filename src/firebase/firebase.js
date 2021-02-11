import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/analytics'
const fireBaseKey= process.env.REACT_APP_API_KEY_FIREBASE
const measurementId=process.env.REACT_APP_MEASUREMENT_ID
const senderID=process.env.REACT_APP_MESSAGING_SENDER_ID
// <!-- The core Firebase JS SDK is always required and must be listed first -->




  var firebaseConfig = {
    apiKey: fireBaseKey,
    authDomain: "distilld-30674.firebaseapp.com",
    databaseURL: "https://distilld-30674.firebaseio.com",
    projectId: "distilld-30674",
    storageBucket: "distilld-30674.appspot.com",
    messagingSenderId: senderID,
    appId: "1:153570672106:web:feed54bb2096fff78e4693",
    measurementId: measurementId
  };
 
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

const storage = firebase.storage()
export {
  storage, firebase as default
}