import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/messaging';

const config = {
    apiKey: 'AIzaSyD7dBI50LSZrs_FF0xkAvZApor2JQPwOMY',
    authDomain: 'eattogether-1b09c.firebaseapp.com',
    databaseURL: 'https://eattogether-1b09c.firebaseio.com',
    projectId: 'eattogether-1b09c',
    storageBucket: 'eattogether-1b09c.appspot.com',
    messagingSenderId: '972983999677',
    appId: '1:972983999677:web:62a77251b18a810fae2bd4'
};

const firebaseProvider = firebase.initializeApp(config);
export default firebaseProvider;
