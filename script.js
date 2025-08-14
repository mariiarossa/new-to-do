const listsContainer = document.querySelector(".todo__lists-container");
const addListBtn = document.querySelector(".todo__add-list");
const listNameInput = document.querySelector(".todo__input-list");

function createList(name) {
    const listBlock = document.createElement("div");
    listBlock.classList.add("todo__list-block");

    const header = document.createElement("div");
    header.classList.add("todo__list-header");

    const title = document.createElement("h3");
    title.classList.add("todo__list-title");
    title.textContent = name;

    const deleteListBtn = document.createElement("button");
    deleteListBtn.classList.add("todo__delete-list");
    deleteListBtn.textContent = "×";

    header.appendChild(title);
    header.appendChild(deleteListBtn);

    const row = document.createElement("div");
    row.classList.add("todo__row");

    const taskInput = document.createElement("input");
    taskInput.type = "text";
    taskInput.classList.add("todo__input");
    taskInput.placeholder = "Додайте завдання";

    const addTaskBtn = document.createElement("button");
    addTaskBtn.classList.add("todo__add");
    addTaskBtn.textContent = "Add";

    row.appendChild(taskInput);
    row.appendChild(addTaskBtn);

    const ul = document.createElement("ul");
    ul.classList.add("todo__list");

    listBlock.appendChild(header);
    listBlock.appendChild(row);
    listBlock.appendChild(ul);
    listsContainer.appendChild(listBlock);

    addTaskBtn.addEventListener("click", () => {
        if (taskInput.value.trim() === "") {
            alert("Будь ласка введіть завдання!");
            return;
        }
        const li = document.createElement("li");
        li.classList.add("todo__item");
        li.textContent = taskInput.value;

        const deleteBtn = document.createElement("span");
        deleteBtn.classList.add("todo__delete");

        const img = document.createElement("img");
        img.src = "img/close.svg";
        img.alt = "Delete task";
        img.classList.add("todo__delete-icon");

        deleteBtn.appendChild(img);
        li.appendChild(deleteBtn);
        ul.appendChild(li);

        taskInput.value = "";
        saveData();
    });

    ul.addEventListener("click", (e) => {
        if (e.target.classList.contains("todo__item")) {
            e.target.classList.toggle("todo__item--checked");
        } else if (e.target.closest(".todo__delete")) {
            e.target.closest(".todo__item").remove();
        }
        saveData();
    });

    deleteListBtn.addEventListener("click", () => {
        listBlock.remove();
        saveData();
    });
}

addListBtn.addEventListener("click", () => {
    if (listNameInput.value.trim() === "") {
        alert("Введіть назву листа!");
        return;
    }
    createList(listNameInput.value);
    listNameInput.value = "";
    saveData();
});

function saveData() {
    localStorage.setItem("todoMultipleData", listsContainer.innerHTML);
}

function showLists() {
    listsContainer.innerHTML = localStorage.getItem("todoMultipleData") || "";
    listsContainer.querySelectorAll(".todo__list-block").forEach((block) => {
        const taskInput = block.querySelector(".todo__input");
        const addTaskBtn = block.querySelector(".todo__add");
        const ul = block.querySelector(".todo__list");
        const deleteListBtn = block.querySelector(".todo__delete-list");

        addTaskBtn.addEventListener("click", () => {
            if (taskInput.value.trim() === "") {
                alert("Будь ласка введіть завдання!");
                return;
            }
            const li = document.createElement("li");
            li.classList.add("todo__item");
            li.textContent = taskInput.value;

            const deleteBtn = document.createElement("span");
            deleteBtn.classList.add("todo__delete");

            const img = document.createElement("img");
            img.src = "img/close.svg";
            img.alt = "Delete task";
            img.classList.add("todo__delete-icon");

            deleteBtn.appendChild(img);
            li.appendChild(deleteBtn);
            ul.appendChild(li);

            taskInput.value = "";
            saveData();
        });

        ul.addEventListener("click", (e) => {
            if (e.target.classList.contains("todo__item")) {
                e.target.classList.toggle("todo__item--checked");
            } else if (e.target.closest(".todo__delete")) {
                e.target.closest(".todo__item").remove();
            }
            saveData();
        });

        deleteListBtn.addEventListener("click", () => {
            block.remove();
            saveData();
        });
    });
}

showLists();
