import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyDSkfkLyQIGW-lR4JuYBg2F2S6XB2cc1Ts",
    authDomain: "blog-app-394d7.firebaseapp.com",
    projectId: "blog-app-394d7",
    storageBucket: "blog-app-394d7.appspot.com",
    messagingSenderId: "850340029521",
    appId: "1:850340029521:web:84d77e569740d29c410470",
    measurementId: "G-63XNKZ9C1N"
};

firebase.initializeApp(firebaseConfig);
export default firebase;
