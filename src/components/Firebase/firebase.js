import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
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
    this.store = app.storage();
    this.fs = app.firestore();
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

  /*user = uid => this.db.ref(`users/${uid}`);

  users = () => this.db.ref('users');

  feed = () => this.db.ref('feed');*/
  auth = () => this.fs.auth();

  user = uid => this.fs.collection('users').doc(uid);

  users = () => this.fs.collection('users');

  posts = () => this.fs.collection('posts');

  feed = uid => this.fs.collection("users").doc(uid).collection('feed');

  post = postid => this.fs.collection('posts').doc(postid);

  posts = () => this.fs.collection('posts');

  // post = postid => this.fs.collection("posts").doc(postid).collection("conversation");

  fs = () => this.fs;

  photos = (uid) => this.store.ref(uid);

}


export default Firebase;