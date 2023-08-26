let tasks = [];
const taskList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');

console.log('Working');

function addTaskToDOM(task){
    const li=document.createElement('li');

    li.innerHTML = `
    <input type="checkbox" id="${task.id}" class="custom-checkbox">
          <label for="${task.id}">${task.text}</label>
          <img src="bin.png.png" class="delete" data-id="${task.id}" />
    `;
    taskList.append(li);
}

function renderList () {
    taskList.innerHTML='';
    for(let i=0;i<tasks.length;i++){
        addTaskToDOM(tasks[i]);
    }
    tasksCounter.textContent=tasks.length;
}

function markTaskAsComplete (taskId) {
    const Tasks= tasks.filter(function (task){
        return task.id == taskId
    });
    if(Tasks>0){
        const currentTask = Tasks[0];
        currentTask.done = !currentTask.done;
        renderList();
        showNotification("Task Toggled");
        return;
    }

    showNotification("task toggle failed");
}

function deleteTask (taskId) {
    const newTasks= tasks.filter(function (task){
        return task.id !== taskId
    });
    tasks=newTasks;
    renderList();
    showNotification("Task deleted");

}

function addTask (task) {
    if(task){
        tasks.push(task);
        renderList();
        showNotification('Task added successfully');
        return;
    }
    showNotification("unable to add task");
}

function showNotification(text) {
    alert(text);
}

function handleInputKeypress (e) {
    if(e.key=='Enter'){
        const text=e.target.value;
        if(!text){
            showNotification("Please enter your text");
            return;
        }

        const task={
            text,
            id: Date.now().toString(),
            done:false
        }

        e.target.value="";
        addTask(task);
    }
}

function handleClickListener(e){
    const target = e.target;
    console.log(target);
    if(target.className ==='delete'){
        const taskId=target.id;
        deleteTask(taskId);
        return;
    }
    else  if(target.className ==='custom-checkbox'){
        const taskId=target.id;
        markTaskAsComplete(taskId);
        return;
    }
}

function initializeApp(){
    addTaskInput.addEventListener('keyup',handleInputKeypress);
    document.addEventListener('click',handleClickListener);
}

initializeApp();
//addTaskInput.addEventListener('keyup',handleInputKeypress);
