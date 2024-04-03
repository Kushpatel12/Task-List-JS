// Define UI variable

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


// Load  all event listener

loadEventListeners();

function loadEventListeners() {
    // Add task event
    form.addEventListener('submit', addTask);
    // Remove Task event
    taskList.addEventListener('click', removeTask);
    // Clear task event
    clearBtn.addEventListener('click', clearTask);
    // Filter task event
    filter.addEventListener('keyup', filterTask);
    // DOM load event
    document.addEventListener('DOMContentLoaded', getTask);
}

// Task Design

const card = document.getElementById('task-title');


 card.style.background = 'black';
 card.style.textAlign = 'center';
 card.style.color = 'white';
 card.style.padding = '5px';
 card.style.fontSize = '30px';
 card.style.fontFamily = 'cursive';


// Add Task

function addTask(e) {
    if (taskInput.value === '') {
        alert('Add a Task');
        e.taskList.remove();
    }
    


    // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create text node and append child to li
    li.appendChild(document.createTextNode(taskInput.value));
    // Create a element 
    const link = document.createElement('a');
    // Add class 
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class = "fa fa-remove"></i>';
    // Append the link to li
    li.appendChild(link);


    // Append li to ul
    taskList.appendChild(li);

    // Store in LS
    storeTaskInLocalStorage(taskInput.value);

    // Clear input
    taskInput.value = '';


    e.preventDefault();
}

// Remove Task

function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are you Sure!')) {
            e.target.parentElement.parentElement.remove();
        }
    }

    removeTaskFromLocalStorage(e.target.parentElement.parentElement);
}

// Remove Task from Loacl Storage

function removeTaskFromLocalStorage(taskItem) {
    let Tasks;
    
    // to check the text are there and if text are there then it became string
    if (localStorage.getItem('Tasks') === null) {
        Tasks = [];
    }else {
        Tasks = JSON.parse(localStorage.getItem('Tasks'));
    }

    Tasks.forEach(function (task, index) {
        if (taskItem.textContent === task) {
            Tasks.splice(index, 1);
        }
    })

    localStorage.setItem('Tasks', JSON.stringify(Tasks));
}


// Clear Task

function clearTask() {
   
    // (1)
    // taskList.innerHTML = '';


    // (2)
    while(taskList.firstChild){
       taskList.removeChild(taskList.firstChild);
    }

    // Clear task from Local Storage
     clearTaskFromLocalStorage();
}


// Clear Task from Local Storage

function clearTaskFromLocalStorage() {
    localStorage.clear();
}


// Filter Task

function filterTask(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function (task) {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        }else{
            task.style.display = 'none';
        }
    })
}



// Storage Task

function storeTaskInLocalStorage(task) {
    let Tasks;
    
    // to check the text are there and if text are there then it became string
    if (localStorage.getItem('Tasks') === null) {
        Tasks = [];
    }else {
        Tasks = JSON.parse(localStorage.getItem('Tasks'));
    }

    Tasks.push(task);

    localStorage.setItem('Tasks', JSON.stringify(Tasks));

}



// Get task from local storage

function getTask() {
    let Tasks;
    
    // to check the text are there and if text are there then it became string
    if (localStorage.getItem('Tasks') === null) {
        Tasks = [];
    }else {
        Tasks = JSON.parse(localStorage.getItem('Tasks'));
    }


    Tasks.forEach(function (task) {
        // Create li element
        const li = document.createElement('li');
        // Add class
        li.className = 'collection-item';
        // Create text node and append child to li
        li.appendChild(document.createTextNode(task));
        // Create li element 
        const link = document.createElement('a');
        // Add class 
        link.className = 'delete-item secondary-content';
        // Add icon html
        link.innerHTML = '<i class = "fa fa-remove"></i>';
        // Append the link to li
        li.appendChild(link);


        // Append li to ul
        taskList.appendChild(li);
    })

}