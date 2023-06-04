
export function add (a,b){
    return a + b;
}


export function emptyField (inputField){
    inputField.value = '';
}
export function ClearElList (listEl){
    listEl.innerHTML = "";
}

// export function CreateListElement (list, addedValue){
//     //list.innerHTML += `<li>${addedValue}</li>`;
//     let itemID = addedValue[0];
//     let itemValue = addedValue[1];
    
//     let newEl = document.createElement("li");
//     newEl.textContent = itemValue;

//     newEl.addEventListener("dblclick", function(){
//         console.log(itemID)
//     })


//     list.append(newEl)
// }
