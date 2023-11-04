var isOpen = false;
var pageSubContainer;
var pageHash;
var navMenu;

function init() {
    navMenu = document.getElementById("collapsibleNav");
    pageHash = decodeURI(window.location.hash);
    pageSubContainer = document.getElementById("pageSubContainer");
    pageContainer = document.getElementById("pageContainer");
    dateButton = document.getElementById("addDateButton");
    dateContainer = document.getElementById("dateContainer");
    let tempdiv = document.createElement("div");
    tempdiv.innerHTML = "<h1></h1>"
    tempdiv.firstChild.innerText = pageHash.substring(pageHash.indexOf("-")+1);
    tempdiv.firstChild.id = "eventTitle"
    pageContainer.insertBefore(tempdiv, pageContainer.firstChild);
    let tempP = document.createElement("p");
    tempP.innerText = "Share this link with people: ";
    tempP.onclick = function(){
        navigator.clipboard.writeText(window.location.href);
        alert("Copied!");
    }
    let tempLink = document.createElement("b");
    tempLink.innerText = window.location.href;
    tempLink.onclick = function(){
        navigator.clipboard.writeText(window.location.href);
        alert("Copied!");
    }
    pageSubContainer.after(tempP)
    tempP.after(tempLink)
}

function addCalendarBox(element) {
    pageSubContainer = document.getElementById("pageSubContainer");
    let tempdiv2 = document.createElement("div");
    tempdiv2.classList.add("calenderBox");
    let btag = document.createElement("b");
    btag.innerText = element;
    tempdiv2.appendChild(btag);
    tempdiv2.appendChild(document.createElement("br"));
    let inputtag = document.createElement("input");
    inputtag.type = "checkbox";
    inputtag.id = element;
    inputtag.classList.add("checkboxInput");
    tempdiv2.appendChild(inputtag);

    pageSubContainer.appendChild(tempdiv2);
    return inputtag;
}

function addCalendarResultBox(element) {
    pageSubContainer = document.getElementById("pageSubContainer");
    let tempdiv2 = document.createElement("div");
    tempdiv2.classList.add("calenderBox");
    let btag = document.createElement("b");
    btag.innerText = element;
    tempdiv2.appendChild(btag);
    tempdiv2.appendChild(document.createElement("br"));
    let resultText = document.createElement("p");
    resultText.innerText = 0;
    resultText.id = element;
    resultText.classList.add("dateResult");
    tempdiv2.appendChild(resultText);

    pageSubContainer.appendChild(tempdiv2);
    return resultText;
}

function toggleMenuState() {
    if (isOpen) {
        //makeclosed
        navMenu.classList.add("closedNav");
    }
    else {
        //makeopen
        navMenu.classList.remove("closedNav");
    }
    isOpen = !isOpen;
    console.log(isOpen)
}