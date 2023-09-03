import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://add-to-cart-app-c9fa7-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
let itemsInDB = ref(database, "items")

const addBtn = document.getElementById("add-button")
const inputField = document.getElementById("input-field")
const shoppingList = document.getElementById("shopping-list")

// https://add-to-cart-app-c9fa7-default-rtdb.firebaseio.com/
addBtn.addEventListener("click", function(){
    let inputFieldValue = inputField.value
    inputField.value = ""
    push(itemsInDB, inputFieldValue)
    shoppingList.innerHTML += `<li>${inputFieldValue}</li>`
})