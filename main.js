window.onload = init();
var dateButton;
var dateContainer;
var isOpen = false;
var navMenu;

function init(){
    let initInputs = document.getElementsByClassName("dateInputs");
    for(var item of initInputs){
        item.min = new Date().toISOString().split("T")[0];
        item.max = new Date((new Date()).getTime() + (365 * 86400000)).toISOString().split("T")[0];
    }
    dateButton = document.getElementById("addDateButton");
    dateContainer = document.getElementById("dateContainer");
    navMenu = document.getElementById("collapsibleNav");
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
    newDateInput.max = new Date((new Date()).getTime() + (365 * 86400000)).toISOString().split("T")[0];
    newDateInput.classList.add("dateInputs");
    newDateInput.classList.add("fadeIn");
    newDateInput.addEventListener('animationend', function(e) {$(newDateInput).removeClass("fadeIn");});
    dateContainer.appendChild(newDateInput);
}
function removeDateButtonFunct() {
    if(dateContainer.childElementCount>1)
        dateContainer.removeChild(dateContainer.lastChild);
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