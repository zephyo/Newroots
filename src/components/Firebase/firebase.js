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
      .then(() => successCallback(user))
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

  network = uid => this.fs.collection("users").doc(uid).collection('network');

  requests = uid => this.fs.collection("users").doc(uid).collection('requests');

  post = postid => this.fs.collection('posts').doc(postid);

  postConversation = postid => this.fs.collection('posts').doc(postid).collection("conversation");

  posts = () => this.fs.collection('posts');

  fs = () => this.fs;

  photos = (uid) => this.store.ref(uid);


  /* Helper Functions */

  checkIfMuted = (uid, theirUid, mutedCallback) => {
    this.muteList(uid).doc(theirUid).get()
      .then((doc) => {
        if (doc.exists) {
          mutedCallback();
        }
      })
  }

  mutePoster = (uid, mutedUid, callback = null) => {
    this.muteList(uid)
      .doc(mutedUid).set({
        exists: true
      })
      .then(callback);
  }

  unmutePoster = (uid, unmuteUid, callback = null) => {
    this.muteList(uid)
      .doc(unmuteUid).delete().then(callback);
  }

  reportPoster = (uid, posterUid) => {

  }

  reportPost = (uid, postid) => {

  }

  addToNetwork = (myUid, theirUid) => {
    this.network(myUid)
      .doc(theirUid)
      .set({ exists: true })
      .then(() => { });
    this.network(theirUid)
      .doc(myUid)
      .set({ exists: true })
      .then(() => { });
  }

  addToFeed = (myUid, theirUid) => {
    //update their feed with your posts; update your feed with their posts
    this.feed(myUid).where('uid', '==', myUid).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.feed(theirUid).doc(doc.id).set(doc.data());
      });
    });

    this.feed(theirUid).where('uid', '==', theirUid).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.feed(myUid).doc(doc.id).set(doc.data());
      });
    });
  }

}


export default Firebase;