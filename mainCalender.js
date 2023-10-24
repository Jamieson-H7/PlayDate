var isOpen = false;
var pageSubContainer;
var pageHash;

function init() {
    pageHash = decodeURI(window.location.hash);
    pageSubContainer = document.getElementById("pageSubContainer");
    pageContainer = document.getElementById("pageContainer");
    dateButton = document.getElementById("addDateButton");
    dateContainer = document.getElementById("dateContainer");
    navMenu = document.getElementById("collapsibleNav");
    let tempdiv = document.createElement("div");
    tempdiv.innerHTML = "<h1></h1>"
    tempdiv.firstChild.innerText = pageHash.substring(pageHash.indexOf("-") + 1);
    tempdiv.firstChild.id = "eventTitle"
    pageContainer.insertBefore(tempdiv, pageContainer.firstChild);
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