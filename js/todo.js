const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("todo-list");

let toDos = [];
const TODOS_KEY = "todos";

function handleToDoSubmit(event) {
    event.preventDefault();
    const newToDo = toDoInput.value;
    toDoInput.value = "";
    const objToDo = {
        id: Date.now(),
        text: newToDo
    }
    toDos.push(objToDo);
    addToDo(objToDo);
    saveToDos();
}

function addToDo(objToDo) {
    const li = document.createElement("li");
    const input = document.createElement("input");
    input.value = objToDo.id;
    input.type = "hidden";
    const span = document.createElement("span");
    span.innerText = objToDo.text;
    const button = document.createElement("button");
    button.innerText = "❌";
    button.addEventListener("click", removeToDo);

    li.appendChild(input);
    li.appendChild(span);
    li.appendChild(button);
    toDoList.appendChild(li);
}

function removeToDo(event) {
    const li = event.target.parentElement;
    const thisId = li.querySelector("input");
    for (let i = 0; i < toDos.length; i++) {
        if (parseInt(toDos[i].id) === parseInt(thisId.value)) {
            toDos.splice(i, 1);
            break;
        }
    }
    li.remove();
    saveToDos();
}

function saveToDos() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}


function firstSettingToDos() {
    const getToDoList = localStorage.getItem(TODOS_KEY);
    if (getToDoList !== null) {

        const arryToDoList = JSON.parse(getToDoList);
        arryToDoList.forEach(element => {
            addToDo(element);
        });
        // for (let i = 0; i < arryToDoList.length; i++) {
        //     addToDo(arryToDoList[i]);
        // }
        toDos = arryToDoList;
    }
}
firstSettingToDos();

toDoForm.addEventListener("submit", handleToDoSubmit);