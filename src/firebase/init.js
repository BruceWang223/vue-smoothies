import firebase from 'firebase/app'
import firestore from 'firebase/firestore'
// Initialize Firebase
var config = {
    apiKey: "AIzaSyCUi93mQcqL87H1tistRanas2_j4B7x9oI",
    authDomain: "smoothies-527b1.firebaseapp.com",
    databaseURL: "https://smoothies-527b1.firebaseio.com",
    projectId: "smoothies-527b1",
    storageBucket: "smoothies-527b1.appspot.com",
    messagingSenderId: "683833723695"
};
const firebaseApp = firebase.initializeApp(config);
firebaseApp.firestore().settings({timestampsInSnapshots: true});
// export firestore database
export default firebaseApp.firestore();
