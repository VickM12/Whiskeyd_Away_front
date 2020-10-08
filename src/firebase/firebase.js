import firebase from 'firebase/app'
import 'firebase/storage'
const fireBaseKey= process.env.REACT_APP_API_KEY_FIREBASE
const measurementId=process.env.REACT_APP_MEASUREMENT_ID
const senderID=process.env.REACT_APP_MESSAGING_SENDER_ID
// <!-- The core Firebase JS SDK is always required and must be listed first -->

{/* <script src="https://www.gstatic.com/firebasejs/7.22.1/firebase-app.js"></script> */}

// <!-- TODO: Add SDKs for Firebase products that you want to use
//      https://firebase.google.com/docs/web/setup#available-libraries -->
{/* <script src="https://www.gstatic.com/firebasejs/7.22.1/firebase-analytics.js"></script> */}


{/* <script> */}
  {/* // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional */}
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
  {/* // Initialize Firebase */}
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
{/* </script> */}
const storage = firebase.storage()
export {
  storage, firebase as default
}