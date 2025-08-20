const listsContainer = document.querySelector(".todo__lists-container");
const addListBtn = document.querySelector(".todo__add-list");
const listNameInput = document.querySelector(".todo__input-list");
const lists = []; // Array of lists. [ { name: "List 1", tasks: [{...}] }, { name: "List 2", tasks: [{name: "Task 1", done: false}] } ]

// Data Management Functions
function saveData() {
    localStorage.setItem("todo-lists", JSON.stringify(lists));
}

function loadData() {
    const savedLists = JSON.parse(localStorage.getItem("todo-lists")) || [];
    lists.length = 0; // Clear the current lists array
    lists.push(...savedLists);
}

function createList(name) {
    const newList = {
        name: name,
        tasks: []
    };
    lists.push(newList);
    saveData();
}

function removeList(index) {
    lists.splice(index, 1);
    saveData();
}

function addTaskToList(listIndex, taskName) {
    const task = {
        name: taskName,
        done: false
    };
    lists[listIndex].tasks.push(task);
    saveData();
}

function removeTaskFromList(listIndex, taskIndex) {
    lists[listIndex].tasks.splice(taskIndex, 1);
    saveData();
}

function toggleTaskDone(listIndex, taskIndex) {
    lists[listIndex].tasks[taskIndex].done = !lists[listIndex].tasks[taskIndex].done;
    saveData();
}

// UI Functions
function clearListsContainer() {
    listsContainer.innerHTML = ""; // Clear the container
}

function renderLists() {
    clearListsContainer();
    lists.forEach((list, index) => {
        renderList(list, index);
    });
}

function renderList(list, listIndex) {
    // Create the list block
    const listBlock = document.createElement("div");
    listBlock.classList.add("todo__list-block");
    listBlock.innerHTML = `
        <div class="todo__list-header">
            <h3 class="todo__list-title">${list.name}</h3>
            <button class="todo__delete-list">×</button>
        </div>
        <div class="todo__row">
            <input type="text" class="todo__input" placeholder="Додайте завдання">
            <button class="todo__add">Add</button>
        </div>
        <ul class="todo__list"></ul>
    `;
    listsContainer.appendChild(listBlock);

    // Add event listeners for the list
    const deleteListBtn = listBlock.querySelector(".todo__delete-list");
    deleteListBtn.addEventListener("click", () => {
        removeList(listIndex);
        renderLists();
    });

    const taskInput = listBlock.querySelector(".todo__input");
    const addTaskBtn = listBlock.querySelector(".todo__add");
    addTaskBtn.addEventListener("click", () => {
        if (taskInput.value.trim() === "") {
            alert("Будь ласка введіть завдання!");
            return;
        }

        addTaskToList(listIndex, taskInput.value);
        renderLists();
    });

    // Add tasks to the list
    list.tasks.forEach((task, taskIndex) => {
        const ul = listBlock.querySelector(".todo__list");
        const li = document.createElement("li");
        li.classList.add("todo__item");
        li.innerHTML = `
            <span>${task.name}</span>
            <span class="todo__delete">
                <img src="img/close.svg" alt="Delete task" class="todo__delete-icon">
            </span>
        `;
        ul.appendChild(li);

        // Check if the task is done
        if (task.done) {
            li.classList.add("todo__item--checked");
        }

        // Add event listener for deleting the task
        const deleteTaskBtn = li.querySelector(".todo__delete-icon");
        deleteTaskBtn.addEventListener("click", () => {
            removeTaskFromList(listIndex, taskIndex);
            renderLists();
        });

        // Add event listener for toggling task done state
        li.addEventListener("click", () => {
            toggleTaskDone(listIndex, taskIndex);
            li.classList.toggle("todo__item--checked");
        });
    });
}

addListBtn.addEventListener("click", () => {
    if (listNameInput.value.trim() === "") {
        alert("Введіть назву листа!");
        return;
    }

    createList(listNameInput.value.trim());
    renderLists();
    listNameInput.value = ""; 
});

loadData();
renderLists();