// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-analytics.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
import { getAuth, signInAnonymously, onAuthStateChanged, signInWithPopup, signInWithRedirect, GoogleAuthProvider} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA4wT2ZMgcImvO4AH8eKazpzYLXhI3-BEM",
  authDomain: "playdatedatabase.firebaseapp.com",
  projectId: "playdatedatabase",
  storageBucket: "playdatedatabase.appspot.com",
  messagingSenderId: "694445720580",
  appId: "1:694445720580:web:977f5661db8ac1d016a151",
  measurementId: "G-C5LLGKQRLP"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);
const auth = getAuth();
auth.useDeviceLanguage();
const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('https://www.googleapis.com/auth/contacts.readonly');
googleProvider.setCustomParameters({
  'login_hint': 'user@example.com'
});
var userRef;



signInWithPopup(auth, googleProvider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    console.log(errorCode)
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
    signInWithRedirect(auth, googleProvider);
  });

// signInAnonymously(auth)
// .then(() => {
//   // Signed in..
// })
// .catch((error) => {
//   const errorCode = error.code;
//   const errorMessage = error.message;
//   // ...
// });

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    userRef = ref(database, 'users/' + uid);
  } else {
    // User is signed out
    // ...
  }
});

window.onload = initial();
window.onload = ()=>{console.log(true)}

function addUserData(data) {
  set(userRef, data);
}

function initial(){
  let initInputs = document.getElementsByClassName("dateInputs");
  let dateButton = document.getElementById("addDateButton");
  let dateContainer = document.getElementById("dateContainer");
  let nameInput = document.getElementById("nameInput");
  let submitButton = document.getElementById("submitDates");
  console.log(submitButton)
  
  submitButton.addEventListener("click", ()=>{
    console.log(true)
    console.log(nameInput.value)
    if(nameInput.value==""){
      return
    }
    let temp = {
      meetupName: nameInput.value,
      dates: [],
      creationDate: Date.now()
    };
    for (let item of initInputs) {
      console.log(item.value)
      if(item.value==''){
        return;
      }
      temp.dates.push(item.value);
    }
    addUserData(temp)
  });
}
