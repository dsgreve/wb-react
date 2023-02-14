import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDQnXsqfeVQlooe4MsOY8roMhBhdJZMVGE",  
    authDomain: "catch-of-the-day-dale-greve.firebaseapp.com",  
    databaseURL: "https://catch-of-the-day-dale-greve-default-rtdb.firebaseio.com",  
    projectId: "catch-of-the-day-dale-greve"
});

const base = Rebase.createClass(firebaseApp.database());

// this is a named export
export { firebaseApp };

// this is a default export
export default base;