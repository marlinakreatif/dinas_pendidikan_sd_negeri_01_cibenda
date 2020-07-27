import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBJIptHJsR1aLW4cwPdQmIpdtExZlwcN78",
  authDomain: "sd-negeri-01-cibenda.firebaseapp.com",
  databaseURL: "https://sd-negeri-01-cibenda.firebaseio.com",
  projectId: "sd-negeri-01-cibenda",
  storageBucket: "sd-negeri-01-cibenda.appspot.com",
  messagingSenderId: "163906432275",
  appId: "1:163906432275:web:dc70164157a01d7ea7fee6",
  measurementId: "G-0F4ZT0JKQ4",
};

const Email = "margonopub@gmail.com";
const Password = "123456";

class Firebase {
  constructor() {
    this.app = app;
    this.app.initializeApp(firebaseConfig);

    /* Firebase APIs */

    this.auth = this.app.auth();
    this.db = this.app.firestore();

    this.auth.signInWithEmailAndPassword(Email, Password).catch((errors) => {
      console.log("ERROR AUTENTICATION :", errors);
    });
  }

  // ***********[FIREBASE API]*************
  batch = () => this.db.batch();

  users = () => this.db.collection("users");
  user = (uuid) => this.db.doc(`users/${uuid}`);

  students = () => this.db.collection("students");
  student = (uuid) => this.db.doc(`students/${uuid}`);

  allNews = () => this.db.collection("news");
  news = (uuid) => this.db.doc(`allNews/${uuid}`);

  storageRef = () => this.app.storage().ref();
}

export default Firebase;
