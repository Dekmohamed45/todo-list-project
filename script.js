//Retrieve todo from local storage or initialize an empty array

let todo = JSON.parse(localStorage.getItem
  ('todo')) || [];


const todoInput = document.getElementById("todoInput");

const todoList =  document.getElementById("todoList");

const todoCount =  document.getElementById("todoCount");

const addButton =  document.querySelector(".btn");

const deleteButton = document.getElementById("deleteButton");


//Initialize


document.addEventListener("DOMContentLoaded",
  function () {
    addButton.addEventListener("click", addTask);
    todoInput.addEventListener('keydown', 
      function (event) {
      if (event.key === 'Enter') {
        event.preventDefault(); //this just means dont reload page
        addTask();
      }
    })
    deleteButton.addEventListener("click", deleteAllTasks);
    displayTasks()
  });
  
  function addTask() {
    const newTask= todoInput.value.trim();
    if (newTask !== ""){
      todo.push({
        text: newTask,
        disabled: false,
      })
      saveToLocalStorage();
      todoInput.value = '';
      displayTasks();
    }
  }


function deleteAllTasks() {
  todo=[];
  saveToLocalStorage();
  displayTasks();
}




function displayTasks() {
  todoList.innerHTML = "";
  todo.forEach((item, index) => {
    const p = document.createElement("p");
    p.innerHTML = `
      <div class="todo-container">
        <input type="checkbox" class="todo-checkbox" id="input-${index}" ${
      item.disabled ? "checked" : ""
    }>
        <p id="todo-${index}" class="${
      item.disabled ? "disabled" : ""
    }" onclick="editTask(${index})">${item.text}</p>
      </div>
    `;
    p.querySelector(".todo-checkbox").addEventListener("change", () =>
      toggleTask(index)
    );
    todoList.appendChild(p);
  });
  todoCount.textContent = todo.length;
}


function toggleTask(index){
  todo[index].disabled = !todo[index].disabled;
  saveToLocalStorage();
  displayTasks();
}


function editTask(index) {
  const todoItem = document.getElementById(`todo-${index}`);
  const existingText = todo[index].text;
  const inputElement = document.createElement("input");

  inputElement.value = existingText;
  todoItem.replaceWith(inputElement);
  inputElement.focus();


  function saveEdit(){
    const updatedText = inputElement.value.trim();  
    if (updatedText) {
      todo[index].text = updatedText;
      saveToLocalStorage();
    }
    displayTasks();
}

  inputElement.addEventListener("blur", saveEdit);
  inputElement.addEventListener("keydown", function(event){
    if(event.key === "Enter"){
      saveEdit();
    }
  });
}



function saveToLocalStorage() {
  localStorage.setItem("todo", JSON.stringify(todo))
}



const colorPicker = document.getElementById("theme-color");

// Function to apply and save the selected color
function changeBackgroundColor(color) {
    document.documentElement.style.setProperty("--background-color", color); // Update CSS variable
    localStorage.setItem("themeColor", color); // Save color preference
}

// Load saved theme on page load
document.addEventListener("DOMContentLoaded", () => {
    const savedColor = localStorage.getItem("themeColor");
    if (savedColor) {
        document.documentElement.style.setProperty("--background-color", savedColor);
        colorPicker.value = savedColor; // Set picker to saved color
    }
});

// Event listener for color change
colorPicker.addEventListener("input", (event) => {
    changeBackgroundColor(event.target.value);
});
