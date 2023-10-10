window.onload = init;

var dateButton;
var firstDateInput;
var parentDiv;
var dateContainer;
var isOpen = true;

function init(){
    initInputs = document.getElementsByClassName("dateInputs");
    for(item of initInputs){
        item.min = new Date().toISOString().split("T")[0];
    }
    dateButton = document.getElementById("addDateButton");
    firstDateInput = document.getElementById("firstDateInput");
    dateContainer = document.getElementById("dateContainer");
    navMenu = document.getElementById("collapsibleNav");
    parentDiv = firstDateInput.parentNode;
}

// dateButton.addEventListener("click", dateButtonFunct);

function dateButtonFunct() {
    // console.log("bruh")
    // newRow = document.createElement("tr");
    // newCol = document.createElement("td");
    // newDateInput = document.createElement("input");
    // newDateInput.type = "date";
    // newDateInput.min = new Date().toISOString().split("T")[0];
    // newDateInput.classList.add("dateInputs");
    // // type="date" id="start"
    
    // newCol.appendChild(newDateInput);
    // newRow.appendChild(newCol);
    // parentDiv.insertBefore(newRow, firstDateInput);

    newDateInput = document.createElement("input");
    newDateInput.type = "date";
    newDateInput.min = new Date().toISOString().split("T")[0];
    newDateInput.classList.add("dateInputs");
    newDateInput.classList.add("fadeIn");
    newDateInput.addEventListener('animationend', function(e) {$(newDateInput).removeClass("fadeIn");});
    dateContainer.appendChild(newDateInput);
}

function toggleMenuState(){
    if(isOpen){
        //makeclosed
        navMenu.classList.add("closedNav");
    }
    else{
        //makeopen
        navMenu.classList.remove("closedNav");
    }
    isOpen=!isOpen;
    console.log(isOpen)
}