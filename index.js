import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://add-to-cart-app-c9fa7-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
let itemsInDB = ref(database, "items")

const addBtn = document.getElementById("add-button")
const inputField = document.getElementById("input-field")
const shoppingList = document.getElementById("shopping-list")

addBtn.addEventListener("click", function(){
    if (inputField.value !== "") {
            let inputFieldValue = inputField.value
    clearInputField()

    //pushing items into firebase db through reference
    push(itemsInDB, inputFieldValue)

    }
})

//use onValue to record changes in the db and render shopping list
onValue(itemsInDB, function(snapshot) {

    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
        clearShoppingListEl()
    
        for (let i = 0; i < itemsArray.length; i++){
            let currentItem = itemsArray[i]
            appendItemToShoppingList(currentItem)
        }
    } else {
        shoppingList.innerHTML = `No items here... yet`
    }
})

function clearShoppingListEl() {
    shoppingList.innerHTML = ""
}

function clearInputField() {
    inputField.value = ""
}

function appendItemToShoppingList(item){
    //shoppingList.innerHTML += `<li>${value}</li>`
    let itemID = item[0]
    let itemValue = item[1]

    let newEl = document.createElement("li")
    newEl.textContent = itemValue

    newEl.addEventListener("click", function(){
        let exactLocationOfItemInDB = ref(database, `items/${itemID}`)
        remove(exactLocationOfItemInDB)
    })
    shoppingList.append(newEl)
}