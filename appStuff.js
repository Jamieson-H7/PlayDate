// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-analytics.js";
import { getDatabase, ref, set, child, get } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
import { getAuth, signInAnonymously, onAuthStateChanged, signInWithPopup, signInWithRedirect, GoogleAuthProvider, signOut, createUserWithEmailAndPassword, setPersistence, inMemoryPersistence, browserLocalPersistence } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
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
var signedIn;
var submitButton;

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

function popUpSignIn() {
  setPersistence(auth, browserLocalPersistence).then(() => {
    return signInWithPopup(auth, googleProvider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;
      // The signed-in user info.
      //const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
      if(!(window.location.pathname.indexOf("index.html") == -1)){
        location.reload();
      }
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
      return signInWithRedirect(auth, googleProvider);
    });
  })
}
if (window.location.pathname.indexOf("main.html") == -1) {
  signOut(auth).then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
}

onAuthStateChanged(auth, (user) => {
  let loginImg = document.getElementById("loginImg");
  let logoutImg = document.getElementById("logoutImg");
  console.error(user)
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    uid = user.uid;
    signedIn = true;
    // console.error(uid)
    // userRef = ref(database, 'users/' + uid);
    initiate()
    if(submitButton){
      submitButton.disabled = false;
      submitButton.title="Click to create event!"
    }
    try {
      loginImg.style.display = "none"
      logoutImg.style.display = "inherit"
    }
    catch {
      //lol
    }
  } else {
    signedIn = false;
    if(submitButton){
      submitButton.disabled = true;
      submitButton.title="Login to enable submission."
    }
    //alert("Bruh u signed out dumbass")
    // User is signed out
    // ...
    try {
      loginImg.style.display = "inherit"
      logoutImg.style.display = "none"
    }
    catch {
      //lol
    }
  }
});

async function addUserData(data, insertRef = null) {
  if (insertRef == null) {
    await set(userRef, data).catch((error)=>{
      console.error(error)
      return error.code;
    });
  }
  else {
    await set(insertRef, data).catch((error)=>{
      console.error(error.code=="PERMISSION_DENIED")
      return error.code;
    });
  }
}

window.onload = initBetter()

function initBetter() {
  try {
    init();
  }
  catch {
    console.error("init donezo")
  }
  let logoutButton = document.getElementById("logoutButton");
  console.log(logoutButton)
  logoutButton.addEventListener("click", () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      alert("signed out")
    }).catch((error) => {
      // An error happened.
    });
  })

  let loginButton = document.getElementById("loginButton");
  loginButton.addEventListener("click", () => {
    popUpSignIn();
  })

  let winHash = window.location.hash;
  let decodedURI = decodeURI(winHash.replace("#", ""));
  if (window.location.pathname.indexOf("index.html") == -1 && winHash != "") {
    const dbRef = ref(database);
    console.warn(`events/${decodedURI}`)
    //`users/${uid}/${decodedURI}`
    get(child(dbRef, `events/${decodedURI}`)).then((snapshot) => {
      console.warn(snapshot.val());
      if (snapshot.exists()) {
        console.log(snapshot.val());
        if (snapshot.val().anonAllowed && signedIn == false) {
          setPersistence(auth, inMemoryPersistence).then(() => {
            return signInAnonymously(auth)
              .then(() => {
                // Signed in..
              })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorMessage)
                // ...
              });
          })
        }
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }
  if (!signedIn) {

  }
}

function initiate() {
  let initInputs = document.getElementsByClassName("dateInputs");
  let dateButton = document.getElementById("addDateButton");
  let logoutButton = document.getElementById("logoutButton");
  let nameInput = document.getElementById("nameInput");
  submitButton = document.getElementById("submitDates");
  let eventTitle = document.getElementById("eventTitle");
  let checkboxCollection = document.getElementsByClassName("checkboxInput");
  let anonCheck = document.getElementById("anonCheck");
  console.log(submitButton)
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
          undefined: {
            "1900-01-01": false
          },
        },
        dates: datesTemp,
        anonAllowed: anonCheck.checked,
      }



      // CREATE EVENTS WITH USER INSIDE AND NOT USER THEN EVENTS

      console.warn(temp2);
      console.warn('events/' + uid + "-" + nameInput.value);
      addUserData(temp2, ref(database, 'events/' + uid + "-" + nameInput.value));
      // addUserData(temp, ref(database, 'users/' + uid + "/" + nameInput.value));
      
      // let metaDiv = document.createElement("div");
      // metaDiv.innerHTML = `<meta http-equiv="refresh" content="3; URL=https://www.yoururl.com/newpage" />`;
      // document.getElementById("headElement").appendChild(metaDiv);
      setTimeout(function () {
        window.location.hash = uid + "-" + nameInput.value
        window.location.pathname = window.location.pathname.replace("index.html", "") + "main.html";
      }, 2000);
    });
  }
  let winHash = window.location.hash;
  let decodedURI = decodeURI(winHash.replace("#", ""));
  function updateCheckboxes() {
    let element = {}
    for (let item of checkboxCollection) {
      element[item.id] = item.checked;
    }
    console.log(element)
    console.log('events/' + decodedURI + "/eventResponses/" + uid)
    let error = addUserData(element, ref(database, 'events/' + decodedURI + "/eventResponses/" + uid));
    return error;
  }
  if (window.location.pathname.indexOf("index.html") == -1 && winHash != "") {
    const dbRef = ref(database);
    console.warn(`events/${decodedURI}`)
    if(uid == decodedURI.split("-")[0]){
      console.warn("lmao") //
    }
    console.log(uid)
    

    get(child(dbRef, `events/${decodedURI}`)).then((snapshot) => {
      console.warn(snapshot.val());
      if (snapshot.exists()) {
        console.log(snapshot.val());
        snapshot.val().dates.forEach(date => {
          if(!(uid == decodedURI.split("-")[0])){
            addCalendarBox(date).addEventListener("click", () => {
              updateCheckboxes();
            })
          }
        });
        if ((uid == decodedURI.split("-")[0])) {
          let results = {}
          snapshot.val().dates.forEach(date => {
            results[date] = addCalendarResultBox(date);
          });
          console.log(snapshot.val().eventResponses)
          for (let [key, value] of Object.entries(snapshot.val().eventResponses)) {
            for (let [key2, value2] of Object.entries(value)) {
              console.log(key2);
              console.log(value2);
              if(results[key2]){
                results[key2].innerText = parseInt(results[key2].innerText) + (value2 ? 1 : 0);
              }
            }
          }
          console.warn(results)
        }

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
        for (const item in snapshot.val()[uid]) {
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
    // MAKE THIS DEPEND ON A SETTING WHEN MAKING THE EVENT
  }

}
