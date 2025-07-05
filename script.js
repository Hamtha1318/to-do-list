const addBtn = document.getElementById('add-btn');
const taskInput = document.getElementById('task-input');
const priority = document.getElementById('priority');
const taskList = document.getElementById('task-list');

window.onload = loadTasks;

addBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') addTask();
});

function addTask() {
    const taskText = taskInput.value.trim();
    const prio = priority.value;

    if (taskText === "") {
        alert("🚫 Please enter a task!");
        return;
    }

    const li = document.createElement('li');
    li.className = 'task-item';

    const priorityTag = document.createElement('span');
    priorityTag.classList.add('priority-tag');

    if (prio === "Low") priorityTag.classList.add('low');
    if (prio === "Medium") priorityTag.classList.add('medium');
    if (prio === "High") priorityTag.classList.add('high');

    priorityTag.textContent = prio;

    li.innerHTML = `
        <span>${taskText}</span>
        <div class="task-buttons">
            <button class="complete-btn">✔ Done</button>
            <button class="delete-btn">🗑 Delete</button>
        </div>
    `;
    li.querySelector('span').appendChild(priorityTag);

    taskList.appendChild(li);
    taskInput.value = "";
    saveTasks();
}

taskList.addEventListener('click', function(e) {
    if (e.target.classList.contains('delete-btn')) {
        e.target.closest('li').remove();
        saveTasks();
    } else if (e.target.classList.contains('complete-btn')) {
        e.target.closest('li').classList.toggle('completed');
        saveTasks();
    }
});

function saveTasks() {
    localStorage.setItem('tasks', taskList.innerHTML);
}

function loadTasks() {
    taskList.innerHTML = localStorage.getItem('tasks') || "";
}
