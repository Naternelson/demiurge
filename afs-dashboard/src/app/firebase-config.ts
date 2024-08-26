// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDKIyz3dinEvWxUj7yg5iQydABwl8MJUpc',
  authDomain: 'demiurge-10e11.firebaseapp.com',
  projectId: 'demiurge-10e11',
  storageBucket: 'demiurge-10e11.appspot.com',
  messagingSenderId: '739498473302',
  appId: '1:739498473302:web:d8b75efab54c4559d348f7',
  measurementId: 'G-12QREER72W',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
