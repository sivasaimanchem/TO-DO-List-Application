let tasks=[];
const tasksList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
let tasksCounter = document.getElementById('tasks-counter');
var flag=0;

function addTaskToDOM(task){
    const li=document.createElement('li');
    li.innerHTML=`
    <input type="checkbox" id=${task.id} ${task.done ? 'checked' : ''} class="custom-checkbox">
    <label for=${task.id}>${task.text}</label>
    <img src="bin.png.png" class="delete" data-id=${task.id} />`;

  tasksList.append(li);
}

function renderList(){
    tasksList.innerHTML = '';
    for (var i=0; i<tasks.length; i++){
        addTaskToDOM(tasks[i]);
    }
    tasksCounter.textContent=tasks.length;
}

function toggleTask(taskId){
    const toggletask=tasks.filter(function(task){
        return task.id == taskId;
    })
    if(toggletask.length > 0){
        const currentTask=toggletask[0];
        currentTask.done = !currentTask.done;
        renderList();
        if(flag==0){
            showNotification("task checked");
            flag=1;
            return;
        }
        if(flag==1){
            showNotification("task unchecked");
            flag=0;
            return;
        }
    }
    showNotification("can't toggle task");
}

function deleteTask(taskId){

    const newTasks = tasks.filter(function(task){
        return task.id !== taskId;
    })
    tasks=newTasks;
    renderList();
    showNotification("task deleted");
}

function addTask(task){
    if(task){
        tasks.push(task);
        renderList();
        showNotification("task added successfully");
        return;
    }
    showNotification("task cannot be added");
}

function showNotification(text){
    alert(text);
}

function handleInputKeypress(e){
    if(e.key=='Enter'){
        const text=e.target.value;
        if(!text){
            showNotification("task cannot be empty");
            return;
        }

        const task={
            text,
            id: Date.now().toString(),
            done: false
        }
        e.target.value='';
        addTask(task);
    }

}

function handleClickListener(e){
    const target=e.target;
    if(target.className=='delete'){
        const taskId=target.dataset.id;
        deleteTask(taskId);
    }else if(target.className=='custom-checkbox'){
        const taskId=target.id;
        toggleTask(taskId);
    }
}

function initializeApplication(){
    addTaskInput.addEventListener('keyup', handleInputKeypress);
    document.addEventListener('click', handleClickListener);
}

initializeApplication();