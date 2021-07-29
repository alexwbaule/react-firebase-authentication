import app from 'firebase/app';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBRYX0L47Rfn35WLw9xd_dGfBYqly9isvk",
  authDomain: "zmenu-reservas.firebaseapp.com",
  projectId: "zmenu-reservas",
  storageBucket: "zmenu-reservas.appspot.com",
  messagingSenderId: "658982559926",
  appId: "1:658982559926:web:97355165d46a2e2b02c617",
  measurementId: "G-CZBW3EH7YC"
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    /* Helper */

    this.emailAuthProvider = app.auth.EmailAuthProvider;

    /* Firebase APIs */

    this.auth = app.auth();

    /* Social Sign In Method Provider */

    this.googleProvider = new app.auth.GoogleAuthProvider();
    this.facebookProvider = new app.auth.FacebookAuthProvider();
    this.twitterProvider = new app.auth.TwitterAuthProvider();
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignInWithGoogle = () =>
    this.auth.signInWithPopup(this.googleProvider);

  doSignInWithFacebook = () =>
    this.auth.signInWithPopup(this.facebookProvider);

  doSignInWithTwitter = () =>
    this.auth.signInWithPopup(this.twitterProvider);

  doSignOut = () => {
    this.auth.signOut();
    localStorage.removeItem('authUser');
  };

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doSendEmailVerification = () =>
    this.auth.currentUser.sendEmailVerification({
      url: "http://localhost:3000",
    });

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

  // *** Merge Auth and DB User API *** //

  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        next(authUser);
      } else {
        fallback();
      }
    });
}

export default Firebase;
