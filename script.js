let isTodoOn = false;
let removedElements = [];
let tasks = JSON.parse(localStorage.getItem('tasks'))||[]


function deleteFormData(){
    let task  = document.getElementById('task') 
    let date=   document.getElementById('date') 
    let status = document.getElementById('status')

    task.value=""
    date.value=""
    status.value=""
}

function startTodo() {
    if (!isTodoOn) {
        let personalDetailsElements = document.getElementsByClassName("personaldetails");
        while (personalDetailsElements.length > 0) {
            removedElements.push(personalDetailsElements[0]);
            personalDetailsElements[0].parentNode.removeChild(personalDetailsElements[0]);
        }

        let todoElements = document.getElementsByClassName("todo");
        for (let i = 0; i < todoElements.length; i++) {
            todoElements[i].style.display = "block";
        }
        document.title = "Todo list";

        isTodoOn = true;
    }
}

function startmain() {
    document.title = "Dashboard";

    if (isTodoOn) {
        removedElements.forEach(function (element) {
            document.body.appendChild(element);
        });
        removedElements = [];

        let todoElements = document.getElementsByClassName("todo");
        for (let i = 0; i < todoElements.length; i++) {
            todoElements[i].style.display = "none";
        }

        isTodoOn = false;
    }
}

function formdata() {
    document.getElementById('add-button').style.display="block"
    document.getElementById('save-button').style.display="none"
    
    
    document.getElementById("input-container").style.display = "block";
    let elements = document.getElementsByClassName("todobackground");

    for (let i = 0; i < elements.length; i++) {
        elements[i].style.filter = "blur(3px)";
    }
    document.getElementById("alldata").style.display = "none";
    deleteFormData()
    
    
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let tasksHTML = '';

    tasks.forEach((task, index) => {
        tasksHTML += `<p class="dataTask" id="task-${index}" draggable="true"> 
                        <span style="font-size: 20px">${index+1}.&nbsp; &nbsp;<span>  ${task.task}  &nbsp; &nbsp; ${task.date} &nbsp; &nbsp; ${task.status}
                     <span id="main_icons">   <svg onclick="deletetodo(${index})" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" color="#596a7a" fill="none">
    <path d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
    <path d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
    <path d="M9.5 16.5L9.5 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
    <path d="M14.5 16.5L14.5 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
</svg>
                         <svg onclick="edittodo(${index})" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#596a7a" fill="none">
      <path d="M15.2141 5.98239L16.6158 4.58063C17.39 3.80646 18.6452 3.80646 19.4194 4.58063C20.1935 5.3548 20.1935 6.60998 19.4194 7.38415L18.0176 8.78591M15.2141 5.98239L6.98023 14.2163C5.93493 15.2616 5.41226 15.7842 5.05637 16.4211C4.70047 17.058 4.3424 18.5619 4 20C5.43809 19.6576 6.94199 19.2995 7.57889 18.9436C8.21579 18.5877 8.73844 18.0651 9.78375 17.0198L18.0176 8.78591M15.2141 5.98239L18.0176 8.78591" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M11 20H17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
    </svg> </span>
                      </p>`;
   
                    }
    
);

    document.getElementById("alldata").innerHTML = tasksHTML;
    makeDrag();
}

document.getElementById('add-button').addEventListener('click', function () {
    
    
    const task = document.getElementById('task').value;
    const date = document.getElementById('date').value;
    const status = document.getElementById('status').value;

    

    if (task && date && status) {
        if (task.length < 21) {
            let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            tasks.push({ task, date, status });
            localStorage.setItem('tasks', JSON.stringify(tasks));
            loadTasks();
            document.getElementById('task').value = '';
            document.getElementById('date').value = '';
            document.getElementById('status').value = '';
            document.getElementById("input-container").style.display = "none";
            document.getElementById("alldata").style.display = "block";
            let elements = document.getElementsByClassName("todobackground");
            document.getElementById("alldata").style.display = "block";
        
            for (let i = 0; i < elements.length; i++) {
                elements[i].style.filter = "blur(0px)";
            }
        
        } else {
            let Inputtask = document.getElementById("task");
            Inputtask.value = "";
            Inputtask.placeholder = "Under 20 characters permitted";
            Inputtask.style.backgroundColor = "rgb(230, 189, 189)";
        }
    } else {
        change = document.getElementById("input-container");
        change.style.backgroundColor = "rgb(230, 189, 189)";
        setTimeout(function () {
            change.style.backgroundColor = "rgb(234, 241, 241)";
        }, 3000);
    }
});

//close the form 

document.getElementById('closeform').addEventListener('click', function () {
    let elements = document.getElementsByClassName("todobackground");
    document.getElementById("alldata").style.display = "block";

    for (let i = 0; i < elements.length; i++) {
        elements[i].style.filter = "blur(0px)";
    }

    document.getElementById("input-container").style.display = "none";
});

function deletetodo(index) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
}

function edittodo(index) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    // console.log(tasks[index]);

    document.getElementById("input-container").style.display = "block";
    let task = document.getElementById('task');
    let date = document.getElementById('date');
    let status = document.getElementById('status');

    formdata();
    task.value = tasks[index].task;
    date.value = tasks[index].date;
    status.value = tasks[index].status;

    document.getElementById('add-button').style.display = "none";
    document.getElementById('save-button').style.display = "block";

    
    let saveButton = document.getElementById('save-button');
    let newSaveButton = saveButton.cloneNode(true);
    saveButton.parentNode.replaceChild(newSaveButton, saveButton);

    newSaveButton.addEventListener('click', function () {
        if (task.value && date.value && status.value) {
            if (task.value.length < 21) {
                tasks[index] = { task: task.value, date: date.value, status: status.value };
                localStorage.setItem('tasks', JSON.stringify(tasks));
                loadTasks();

                deleteFormData()

                
                document.getElementById("input-container").style.display = "none";
                document.getElementById("alldata").style.display = "block";
                let elements = document.getElementsByClassName("todobackground");
                for (let i = 0; i < elements.length; i++) {
                    elements[i].style.filter = "blur(0px)";
                }
            } else {
                let inputTask = document.getElementById("task");
                inputTask.value = "";
                inputTask.placeholder = "Under 20 characters permitted";
                inputTask.style.backgroundColor = "rgb(230, 189, 189)";
            }
        } else {
            let change = document.getElementById("input-container");
            change.style.backgroundColor = "rgb(230, 189, 189)";
            setTimeout(function () {
                change.style.backgroundColor = "rgb(234, 241, 241)";
            }, 3000);
        }
    });
}


function search_filter(){
    
    
   let searchitem= document.getElementById("search_filter").value
   searchitem = searchitem.toLowerCase()
   console.log(searchitem)
    filtertask=tasks.filter(function(obj){
        return obj.task.toLowerCase().includes(searchitem)
    })
    document.getElementById("alldata").innerHTML=""
    filtertask.forEach(function(task,index){ document.getElementById("alldata").innerHTML+=`<p class="dataTask" id="task-${index}" draggable="true"> 
                        <span style="font-size: 20px">${index+1}. &nbsp; &nbsp;<span>  ${task.task}  &nbsp; &nbsp; ${task.date} &nbsp; &nbsp; ${task.status}
                     <span id="main_icons">   <svg onclick="deletetodo(${index})" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" color="#596a7a" fill="none">
    <path d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
    <path d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
    <path d="M9.5 16.5L9.5 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
    <path d="M14.5 16.5L14.5 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
</svg>
                         <svg onclick="edittodo(${index})" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#596a7a" fill="none">
      <path d="M15.2141 5.98239L16.6158 4.58063C17.39 3.80646 18.6452 3.80646 19.4194 4.58063C20.1935 5.3548 20.1935 6.60998 19.4194 7.38415L18.0176 8.78591M15.2141 5.98239L6.98023 14.2163C5.93493 15.2616 5.41226 15.7842 5.05637 16.4211C4.70047 17.058 4.3424 18.5619 4 20C5.43809 19.6576 6.94199 19.2995 7.57889 18.9436C8.21579 18.5877 8.73844 18.0651 9.78375 17.0198L18.0176 8.78591M15.2141 5.98239L18.0176 8.78591" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M11 20H17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
    </svg> </span>
                      </p>`;})


document.getElementById("search_filter").value=""

}
document.getElementById("search_filter").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        search_filter();
    }
});
function handleFilterChange(){
    
    
   let selectitem= document.getElementById("filter_sort").value
//    console.log(searchitem)

if (selectitem=="status"){
    let incompleteTasks = tasks.filter(task => task.status.toLowerCase() === 'incomplete');
    let inProgressTasks = tasks.filter(task => task.status.toLowerCase() === 'inprogress');
    let completedTasks = tasks.filter(task => task.status.toLowerCase() === 'completed');
    filtertask = incompleteTasks.concat(inProgressTasks, completedTasks);



     }
else if(selectitem=="All"){
    filtertask=tasks
}
else if(selectitem=="Date"){
    filtertask = tasks.sort((a, b) => new Date(a.date) - new Date(b.date));
}
    document.getElementById("alldata").innerHTML=""
    filtertask.forEach(function(task,index){ document.getElementById("alldata").innerHTML+=`<p class="dataTask" id="task-${index}" draggable="true"> 
                        <span style="font-size: 20px">${index+1}. &nbsp; &nbsp;<span>  ${task.task}  &nbsp; &nbsp; ${task.date} &nbsp; &nbsp; ${task.status}
                     <span id="main_icons">   <svg onclick="deletetodo(${index})" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" color="#596a7a" fill="none">
    <path d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
    <path d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
    <path d="M9.5 16.5L9.5 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
    <path d="M14.5 16.5L14.5 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
</svg>
                         <svg onclick="edittodo(${index})" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#596a7a" fill="none">
      <path d="M15.2141 5.98239L16.6158 4.58063C17.39 3.80646 18.6452 3.80646 19.4194 4.58063C20.1935 5.3548 20.1935 6.60998 19.4194 7.38415L18.0176 8.78591M15.2141 5.98239L6.98023 14.2163C5.93493 15.2616 5.41226 15.7842 5.05637 16.4211C4.70047 17.058 4.3424 18.5619 4 20C5.43809 19.6576 6.94199 19.2995 7.57889 18.9436C8.21579 18.5877 8.73844 18.0651 9.78375 17.0198L18.0176 8.78591M15.2141 5.98239L18.0176 8.78591" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M11 20H17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
    </svg> </span>
                      </p>`;})


document.getElementById("search_filter").value=""

}
function handleDragStart(e) {
    this.style.opacity = '0.3';
    this.dragStartX = e.clientX;
    this.dragStartY = e.clientY;
    
   
    

    
}
function handleDrag(e) {
    if (e.clientX === 0 && e.clientY === 0) {
        return; 
    }
    const dragCurrentX = e.clientX;
    const dragCurrentY = e.clientY;
    
    
    const deltaX = dragCurrentX - this.dragStartX;
    const deltaY = dragCurrentY - this.dragStartY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    if (distance > 100 && distance<220) {
        
        this.style.opacity="0.3"
        this.style.backgroundColor = "rgb(255, 39, 6)";
        
    }
    else if(distance>230){
        this.style.opacity="0.1"

        
        this.style.backgroundColor = "#800000";
    }
    else {
        this.style.backgroundColor = ""; // Reset the background color
    }
}

function handleDragEnd(e) {
    
    this.style.opacity = '1';
    this.style.backgroundColor =  'rgba(31, 12, 242, 0.304)'
    
    const dragEndX = e.clientX;
    const dragEndY = e.clientY;
    const deltaX = dragEndX - this.dragStartX;
    const deltaY = dragEndY - this.dragStartY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
   
   

    if (distance > 230) {
        
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        
        const taskId = this.id.split('-')[1];
        tasks.splice(taskId, 1); // Remove the task from the array
        localStorage.setItem('tasks', JSON.stringify(tasks)); // Update the localStorage

        loadTasks()
        
    }
    
}

function makeDrag() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach((task, index) => {
        const taskItem = document.getElementById(`task-${index}`);
        if (taskItem) { // Ensure taskItem exists before adding event listeners
            
            taskItem.addEventListener('dragstart', handleDragStart);
            taskItem.addEventListener('drag', handleDrag);
            taskItem.addEventListener('dragend', handleDragEnd);
        }
    });
}




document.addEventListener('DOMContentLoaded', function () {
    loadTasks();
    formdata();
    
   
    
    // let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    // console.log(tasks)
    let todoElements = document.getElementsByClassName("todo");
    for (let i = 0; i < todoElements.length; i++) {
        todoElements[i].style.display = "none";
    }
});


