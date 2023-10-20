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
    tempdiv2.innerHTML = `<b>${element}</b><br><input type="checkbox" id="${element}" class="checkboxInput"></input>`;
    pageSubContainer.appendChild(tempdiv2);
    return tempdiv2.lastChild;
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