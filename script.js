let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function save(){
localStorage.setItem("tasks",JSON.stringify(tasks));
}

function addTask(){

const input=document.getElementById("taskInput");

if(input.value=="") return;

tasks.push({
text:input.value,
completed:false
});

input.value="";

save();

display(tasks);

}

function display(data){

const list=document.getElementById("taskList");

list.innerHTML="";

data.forEach((task,index)=>{

const li=document.createElement("li");

if(task.completed)
li.classList.add("completed");

li.innerHTML=`

<span onclick="completeTask(${index})">

${task.text}

</span>

<div>

<button onclick="editTask(${index})">Edit</button>

<button onclick="deleteTask(${index})">Delete</button>

</div>

`;

list.appendChild(li);

});

}

function deleteTask(index){

tasks.splice(index,1);

save();

display(tasks);

}

function completeTask(index){

tasks[index].completed=!tasks[index].completed;

save();

display(tasks);

}

function editTask(index){

let newTask=prompt("Edit Task",tasks[index].text);

if(newTask){

tasks[index].text=newTask;

save();

display(tasks);

}

}

document.getElementById("search").addEventListener("keyup",function(){

const value=this.value.toLowerCase();

const filtered=tasks.filter(task=>

task.text.toLowerCase().includes(value)

);

display(filtered);

});

function filterTasks(type){

if(type=="completed"){

display(tasks.filter(task=>task.completed));

}

else if(type=="pending"){

display(tasks.filter(task=>!task.completed));

}

else{

display(tasks);

}

}

function toggleDark(){

document.body.classList.toggle("dark");

}

display(tasks);