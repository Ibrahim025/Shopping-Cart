import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
import * as myFun from "../functions.js"

const appSettings = {
    databaseURL: "https://add-to-cart-e6cb5-default-rtdb.europe-west1.firebasedatabase.app"
}


const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppinListInDB = ref(database, "ShoppingList")


const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const shoppinListEl = document.getElementById("shopping-list");

onValue(shoppinListInDB, function (snapshot) {

    if (snapshot.exists() == true) {
        myFun.ClearElList(shoppinListEl)

        let cartArray = Object.entries(snapshot.val())

        console.log(snapshot.val())

        for (let i = 0; i < cartArray.length; i++) {
            let currentItem = cartArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            CreateListElement(shoppinListEl, currentItem)
        }
    } else{
        shoppinListEl.innerHTML = "No items here... yet"
    }
    
})

addButtonEl.addEventListener("click", function () {
    let inputValue = inputFieldEl.value;
    console.log(`${inputValue} added to database`)

    push(shoppinListInDB, inputValue)

    myFun.emptyField(inputFieldEl)
    //myFun.CreateListElement(shoppinListEl, inputValue)

})

function CreateListElement(list, addedValue) {
    //list.innerHTML += `<li>${addedValue}</li>`;
    let itemID = addedValue[0];
    let itemValue = addedValue[1];

    let newEl = document.createElement("li");
    newEl.textContent = itemValue;

    newEl.addEventListener("dblclick", function () {
        let itemToDelete = ref(database, `ShoppingList/${itemID}`)
        remove(itemToDelete)
    })


    list.append(newEl)
}
