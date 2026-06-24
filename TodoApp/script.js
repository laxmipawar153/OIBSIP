let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");

const pendingList = document.getElementById("pendingList");
const completedList = document.getElementById("completedList");

const pendingCount = document.getElementById("pendingCount");
const completedCount = document.getElementById("completedCount");

const emptyPending = document.getElementById("emptyPending");
const emptyCompleted = document.getElementById("emptyCompleted");

addBtn.addEventListener("click", addTask);

function addTask(){

const text = taskInput.value.trim();

if(text === ""){
alert("Please enter a task");
return;
}

const task = {
id: Date.now(),
text: text,
completed: false,
time: new Date().toLocaleString()
};

tasks.push(task);

taskInput.value = "";

saveTasks();
renderTasks();
}

function saveTasks(){
localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks(){

pendingList.innerHTML = "";
completedList.innerHTML = "";

let pendingCountValue = 0;
let completedCountValue = 0;

tasks.forEach(task => {

const li = document.createElement("li");

li.innerHTML = ` <span class="task-text">
${task.text} <br> <small>${task.time}</small> </span>

<div class="actions">
<button onclick="toggleTask(${task.id})">
${task.completed ? "Undo" : "Done"}
</button>

<button onclick="editTask(${task.id})">Edit</button> <button onclick="deleteTask(${task.id})">Delete</button>

</div>
`;

if(task.completed){
completedList.appendChild(li);
completedCountValue++;
}else{
pendingList.appendChild(li);
pendingCountValue++;
}

});

pendingCount.textContent = pendingCountValue;
completedCount.textContent = completedCountValue;

emptyPending.style.display =
pendingCountValue === 0 ? "block" : "none";

emptyCompleted.style.display =
completedCountValue === 0 ? "block" : "none";

saveTasks();
}

function toggleTask(id){

tasks = tasks.map(task => {

if(task.id === id){
task.completed = !task.completed;
if(task.completed){
task.completedTime = new Date().toLocaleString();
}
}

return task;
});

renderTasks();
}

function editTask(id){

const task = tasks.find(t => t.id === id);

const newText = prompt("Edit task:", task.text);

if(newText !== null && newText.trim() !== ""){
task.text = newText;
}

renderTasks();
}

function deleteTask(id){
tasks = tasks.filter(task => task.id !== id);
renderTasks();
}

renderTasks();
