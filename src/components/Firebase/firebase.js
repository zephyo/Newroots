import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import * as firebase from 'firebase';

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

  doDelete = (callback, errorCallback) => {
    this.auth.currentUser.delete().then(callback).catch(errorCallback);
  }

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = (password, callback, failCallback) =>
    this.auth.currentUser.updatePassword(password).then(callback).catch(failCallback);

  doEmailUpdate = (email, callback, failCallback) =>
    this.auth.currentUser.updateEmail(email).then(callback).catch(failCallback);

  reAuth = (password, successCallback, failCallback) => {
    const user = this.auth.currentUser;
    const credential = this.auth.EmailAuthProvider.credential(
      user.email,
      password
    );

    user.reauthenticateAndRetrieveDataWithCredential(credential)
      .then(successCallback)
      .catch(failCallback);
  }

  // *** FieldValue API ***

  arrayUnion = args => firebase.firestore.FieldValue.arrayUnion(args);

  arrayRemove = args => firebase.firestore.FieldValue.arrayRemove(args);

  // *** User API ***

  auth = () => this.fs.auth();

  user = uid => this.fs.collection('users').doc(uid);

  users = () => this.fs.collection('users');

  posts = () => this.fs.collection('posts');

  feed = uid => this.fs.collection("users").doc(uid).collection('feed');

  muteList = uid => this.fs.collection("users").doc(uid).collection('muteList');

  post = postid => this.fs.collection('posts').doc(postid);

  postConversation = postid => this.fs.collection('posts').doc(postid).collection("conversation");

  posts = () => this.fs.collection('posts');

  fs = () => this.fs;

  photos = (uid) => this.store.ref(uid);

}


export default Firebase;