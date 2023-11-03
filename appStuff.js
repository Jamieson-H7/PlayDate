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
var signedOutMessage;

window.mobileCheck = function() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

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
    if(!window.mobileCheck()){
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
        // console.log(errorCode)
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        return signInWithRedirect(auth, googleProvider);
      });
    }
    else{
      return signInWithRedirect(auth, googleProvider).then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // The signed-in user info.
        //const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        alert(result)
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        // console.log(errorCode)
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });;
    }
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
  //console.error(user)
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
      console.error(error.code)
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
    console.error("Init() Failed")
  }
  let logoutButton = document.getElementById("logoutButton");
  // console.log(logoutButton)
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
    // console.warn(`events/${decodedURI}`)
    //`users/${uid}/${decodedURI}`
    get(child(dbRef, `events/${decodedURI}`)).then((snapshot) => {
      // console.warn(snapshot.val());
      if (snapshot.exists()) {
        // console.log(snapshot.val());
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
        else{
          if(!signedIn){
            let divTemp = document.createElement("div");
            divTemp.classList.add("pageSubContainer")
            let pTemp = document.createElement("p");
            pTemp.classList.add("trySignIn");
            pTemp.innerText = "↖ This event requires a google sign in, try signing in inside the nav menu!"
            divTemp.appendChild(pTemp);
            signedOutMessage = divTemp;
            document.getElementById("eventTitle").after(divTemp);
          }
        }
      } else {
        // console.log("No data available");
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
  // console.log(submitButton)
  if (submitButton != null) {
    submitButton.addEventListener("click", () => {
      // console.log(true)
      // console.log(nameInput.value)
      if (nameInput.value == "") {
        return
      }
      let datesTemp = []
      for (let item of initInputs) {
        // console.log(item.value)
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

      // console.warn(temp2);
      // console.warn('events/' + uid + "-" + nameInput.value);
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
    // console.log(element)
    // console.log('events/' + decodedURI + "/eventResponses/" + uid)
    let error = addUserData(element, ref(database, 'events/' + decodedURI + "/eventResponses/" + uid));
    return error;
  }

  if (window.location.pathname.indexOf("index.html") == -1 && winHash != "") {
    const dbRef = ref(database);
    // console.warn(`events/${decodedURI}`)
    if(uid == decodedURI.split("-")[0]){
      // console.warn("lmao") //
    }
    // console.log(uid)
    

    get(child(dbRef, `events/${decodedURI}`)).then((snapshot) => {
      // console.warn(snapshot.val());
      if (snapshot.exists()) {
        pageSubContainer = document.getElementById("pageSubContainer");
        if (pageSubContainer.innerHTML != "") {
          window.location.reload();
          throw "Event container had events";
        }
        // console.log(snapshot.val());
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
          // console.log(snapshot.val().eventResponses)
          for (let [key, value] of Object.entries(snapshot.val().eventResponses)) {
            for (let [key2, value2] of Object.entries(value)) {
              // console.log(key2);
              // console.log(value2);
              if(results[key2]){
                results[key2].innerText = parseInt(results[key2].innerText) + (value2 ? 1 : 0);
              }
            }
          }
          // console.warn(results)
        }

      } else {
        // console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });

    get(child(dbRef, `events/${decodedURI}/eventResponses`)).then((snapshot) => {
      // console.warn(snapshot.val());
      if (snapshot.exists()) {
        // console.log(snapshot.val()[uid]);
        for (const item in snapshot.val()[uid]) {
          document.getElementById(item).checked = snapshot.val()[uid][item];
        }
        // snapshot.val()[uid].forEach(element => {
          //  console.log(element)
        // });

      } else {
        // console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
    // MAKE THIS DEPEND ON A SETTING WHEN MAKING THE EVENT
  }

}
