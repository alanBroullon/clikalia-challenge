import firebase from 'firebase/app';
import 'firebase/firestore';

const loadFirebase = () => {
  try {
    const config = {
      apiKey: 'AIzaSyBluUC7l_n_wsxi2nDrSOQ9WXhhF2izGsk',
      authDomain: 'petapp-a6695.firebaseapp.com',
      databaseURL: 'https://petapp-a6695.firebaseapp.com',
      projectId: 'petapp-a6695',
      storageBucket: 'petapp-a6695.appspot.com',
      messagingSenderId: '746467191954',
      appId: '1:746467191954:web:5848fe808eadc2e90d0a4b'
    };
    firebase.initializeApp(config);
  } catch (error) {
    if (!/already exist/.test(error.message)) {
      console.error('Firebase initialization error', error.stack);
    }
  }
  return firebase;
};

export default loadFirebase;