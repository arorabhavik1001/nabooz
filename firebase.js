import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  // firebase config goes here
  
};

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
  firebase.firestore().settings({ experimentalForceLongPolling: true});
} else {
  app = firebase.app();
}

const db = app.firestore();


export { db };
