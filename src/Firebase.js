import firebase from 'firebase';
import config from "../config/constants";

firebase.initializeApp(
  {
    apiKey: config.apiKey,
    authDomain: config.authDomain,
    projectId: config.projectId,
    databaseURL: config.databaseURL,
    storageBucket: config.storageBucket,
    messagingSenderId: config.messagingSenderId
  });

export default firebase;
