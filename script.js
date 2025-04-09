document.addEventListener("DOMContentLoaded",()=>{
    const input=document.getElementById("todo-input");
    const AddBtn=document.getElementById("add-task-btn");
    const TaskList=document.getElementById("todo-list");
    const deadlineInput=document.getElementById("deadlineInput");

    let Tasks= JSON.parse(localStorage.getItem("Tasks")) || [];
    Tasks.forEach(task => {
        renderTasks(task)
    });

    AddBtn.addEventListener("click",()=>{
        const newText=input.value.trim();
        const time=deadlineInput.value.trim() || "Not Set";
        if(newText==="") {
            alert("Task can't be Empty!");
            return ;
        }
        const newTask ={
            id: Date.now(),
            text: newText,
            deadline: time,
            status: false,
        };
        Tasks.push(newTask);
        SaveTasks();
        renderTasks(newTask);
        input.value="";
        deadlineInput.value="";
        console.log(Tasks);
    });
    function renderTasks(task){
        const li=document.createElement("li");
        li.setAttribute("data-id",task.id);
        if(task.status) {
            li.classList.add("completed");
        }
        li.innerHTML=`
        <div>
        <span>${task.text}</span>
        <p class="deadline">Deadline: ${task.deadline}</p>
        </div>
        <button>Done</button>
        `;
        li.addEventListener("click",(e)=>{
            if(e.target.tagName ==="BUTTON")  return;
            task.status=!task.status;
            li.classList.toggle("completed");
            SaveTasks();
        });
        li.querySelector("button").addEventListener("click",(e)=>{
            e.stopPropagation();
            Tasks = Tasks.filter(t=> t.id!==task.id);
            li.remove();
            SaveTasks();
        });
        TaskList.appendChild(li);

    }
    function SaveTasks(){
        localStorage.setItem("Tasks",JSON.stringify(Tasks));
    }
});