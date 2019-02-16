import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const config = {
  apiKey: "AIzaSyAE-aLJJ6ihwSxicksB67Yeg_84vE4J_wM",
  authDomain: "treehacks2019.firebaseapp.com",
  databaseURL: "https://treehacks2019.firebaseio.com",
  projectId: "treehacks2019",
  storageBucket: "treehacks2019.appspot.com",
  messagingSenderId: "50059105382"
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.database();
    this.store = app.storage();
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password); 
  
  doSignOut = () => this.auth.signOut();  

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

  // *** User API ***

  user = uid => this.db.ref(`users/${uid}`);

  users = () => this.db.ref('users');

  feed = () => this.db.ref('feed');

  photos = () => this.store.ref('photos');
}


export default Firebase;