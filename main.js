window.onload = init();
var dateButton;
var dateContainer;
var isOpen = false;
var navMenu;

function init(){
    let initInputs = document.getElementsByClassName("dateInputs");
    let index = 0;
    for(var item of initInputs){
        item.min = new Date().toISOString().split("T")[0];
        item.max = new Date((new Date()).getTime() + (365 * 86400000)).toISOString().split("T")[0];
        item.id = index
        item.addEventListener("change", (e)=>{
            if (new Date(e.target.value).getTime() < new Date(e.target.min).getTime() || new Date(e.target.value).getTime() > new Date(e.target.max).getTime()) {
                var now = new Date();
                var day = ("0" + now.getDate()).slice(-2);
                var month = ("0" + (now.getMonth() + 1)).slice(-2);

                var today = now.getFullYear() + "-" + (month) + "-" + (day);
                e.target.value = today;
            }
        })
        index++;
    }
    dateButton = document.getElementById("addDateButton");
    dateContainer = document.getElementById("dateContainer");
    navMenu = document.getElementById("collapsibleNav");
    
    window.location.hash = "";
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