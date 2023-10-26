// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-analytics.js";
import { getDatabase, ref, set, child, get } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
import { getAuth, signInAnonymously, onAuthStateChanged, signInWithPopup, signInWithRedirect, GoogleAuthProvider, signOut, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
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
var uid;

// createUserWithEmailAndPassword(auth, prompt("email"), prompt("password"))
//   .then((userCredential) => {
//     // Signed up 
//     const user = userCredential.user;
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // ..
//   });

function popUpSignIn(){
  signInWithPopup(auth, googleProvider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;
      // The signed-in user info.
      //const user = result.user;
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
}
if(window.location.pathname.indexOf("index.html")==-1){
  signInAnonymously(auth)
  .then(() => {
    // Signed in..
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ...
  });
}
if(window.location.pathname.indexOf("main.html")==-1){
  signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    uid = user.uid;
    console.error(uid)
    userRef = ref(database, 'users/' + uid);
    initial()
    try {
      init();
    }
    catch {
      //lol
    }
  } else {
    //alert("Bruh u signed out dumbass")
    // User is signed out
    // ...
    try {
      init();
    }
    catch {
      //lol
    }
  }
});

function addUserData(data, insertRef = null) {
  if (insertRef == null) {
    set(userRef, data);
  }
  else {
    set(insertRef, data);
  }
}

function initial() {
  let initInputs = document.getElementsByClassName("dateInputs");
  let dateButton = document.getElementById("addDateButton");
  let logoutButton = document.getElementById("logoutButton");
  let nameInput = document.getElementById("nameInput");
  let submitButton = document.getElementById("submitDates");
  let eventTitle = document.getElementById("eventTitle");
  let checkboxCollection = document.getElementsByClassName("checkboxInput");
  console.log(submitButton)

  logoutButton.addEventListener("click", () => {
    popUpSignIn()
    // signOut(auth).then(() => {
    //   // Sign-out successful.
    // }).catch((error) => {
    //   // An error happened.
    // });
  })
  if (submitButton != null) {
    submitButton.addEventListener("click", () => {
      console.log(true)
      console.log(nameInput.value)
      if (nameInput.value == "") {
        return
      }
      let datesTemp = []
      for (let item of initInputs) {
        console.log(item.value)
        if (item.value == '') {
          return;
        }
        datesTemp.push(item.value);
      }
      let tempTime = Date.now();
      let temp = {
        dates: datesTemp,
        creationTime: tempTime,
      };
      let temp2 = {
        eventResponses: {
          response: "a"
        },
        dates: datesTemp,
      }
      


      // CREATE EVENTS WITH USER INSIDE AND NOT USER THEN EVENTS
      
      
      addUserData(temp2, ref(database, 'events/' + uid + "-" + nameInput.value));
      // addUserData(temp, ref(database, 'users/' + uid + "/" + nameInput.value));
      
      window.location.hash = uid + "-" + nameInput.value
      window.location.pathname = window.location.pathname.replace("index.html", "") + "main.html";
    });
  }
  let winHash = window.location.hash;
  let decodedURI = decodeURI(winHash.replace("#", ""));
  function updateCheckboxes(){
    let element = {}
    for(let item of checkboxCollection){
      element[item.id] = item.checked;
    }
    addUserData(element, ref(database, 'events/' + decodedURI + "/eventResponses/" + uid));
  }
  if (winHash != "") {
    const dbRef = ref(database);
    console.warn(`events/${decodedURI}`)

    //`users/${uid}/${decodedURI}`
    get(child(dbRef, `events/${decodedURI}`)).then((snapshot) => {
      console.warn(snapshot.val());
      if (snapshot.exists()) {
        console.log(snapshot.val());
        snapshot.val().dates.forEach(element => {
          addCalendarBox(element).addEventListener("click",()=>{
            updateCheckboxes();
          })
        });

      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });

    get(child(dbRef, `events/${decodedURI}/eventResponses`)).then((snapshot) => {
      console.warn(snapshot.val());
      if (snapshot.exists()) {
        console.log(snapshot.val()[uid]);
        for( const item in snapshot.val()[uid] ){
          document.getElementById(item).checked = snapshot.val()[uid][item];
        }
        // snapshot.val()[uid].forEach(element => {
        //   console.log(element)
        // });
        
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }
}
