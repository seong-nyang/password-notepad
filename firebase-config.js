const firebaseConfig = {
  apiKey: "AIzaSyC5yV2zt4ywCqognQK1vgKh6bluYvkgZmg",
  authDomain: "password-notepad.firebaseapp.com",
  projectId: "password-notepad",
  storageBucket: "password-notepad.firebasestorage.app",
  messagingSenderId: "134999026464",
  appId: "1:134999026464:web:5332d5d05e040abba24545"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
