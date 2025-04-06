const inputDisplay = document.getElementById("inputDisplay");
const addButton = document.getElementById("addButton");
const orderList = document.getElementById("orderList");
inputDisplay.readOnly = true;

let pendingJapanese = "";
let pendingEnglish = "";
let japaneseCount = "";
let englishCount = "";

//adds selected item into input display 
function addItemName(inJapanese, inEnglish){
    inputDisplay.value = `${inEnglish}`; //shows the english part first
    pendingJapanese = inJapanese; //keeps the japanese part 
    pendingEnglish = inEnglish;   //keeps the english part for further use
}

//adds desired item count into input display
function addItemCount(input){
    japaneseCount = `${input}個`;   // keeps the japanese version 
    englishCount = `× ${input}`;    // keeps the english part for further use
    inputDisplay.value = `${pendingEnglish} ${englishCount}`; //shows the english part and recalls the previously ordered item name 
}

//deletes everything i guess 
function deleteInput(){
    inputDisplay.value = "";    
    pendingJapanese = "";
    pendingEnglish = "";
    japaneseCount = "";
    englishCount = "";
}

//adds an item order into the list 
addButton.addEventListener("click", () => {
    const englishOrder = inputDisplay.value.trim(); //trims unncessary spaces
    if (englishOrder === "") {
        alert("You haven't entered any item!")
        return;
    }    // if there's nothing in inputDisplay, englishOrder won't do anything and the function ends
    if (!/[A-Za-z]/.test(englishOrder) || !/\d/.test(englishOrder)) {
        alert("Both item name and item count please!");
        return; // Prevent adding to the list if the alert is shown
    }
    
    const bilingualOrder = `${pendingJapanese}${japaneseCount}（${pendingEnglish} ${englishCount}）`;   //japanese and english combined

    const li = document.createElement("li");    //order added into order list
    li.textContent = bilingualOrder;    // order receives the combined order

    //creates an entire delete button for each list item
    const deleteButton = document.createElement("button");  //button tag
    deleteButton.textContent = "Delete This Order"; //button text 
    deleteButton.onclick = () => orderList.removeChild(li); //button function in javascript

    li.appendChild(deleteButton);   //delete button gets added 
    orderList.appendChild(li);  //every ordered item will have their own delete button

    //everything gets cleared for another new order
    inputDisplay.value = "";
    pendingJapanese = "";
    pendingEnglish = "";
    japaneseCount = "";
    englishCount = "";
});
