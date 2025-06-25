import { ETaskStatus } from '../../enums/ETaskStatus/ETaskStatus';
import { ITask } from '../../types/ITask/ITask';
import TasksContainer from '../TasksContainer/TasksContainer';
import './TasksDashboard.css';
import { useEffect, useState } from 'react';
import EditTaskModal from '../EditTask/EditTaskModal';
import axios from 'axios';

const TasksDashboard = () => {
// const names = [{name:"rina<3",age:"25"}, {name:"anita<3",age:"35"}];
const [tasksFromBack, setTasksFromBack ] = useState<{toDo:Array<any>,inprogress:Array<any>,review:Array<any>,done:Array<any>,}>({toDo:[],inprogress:[],review:[],done:[]});
const [tasks, setTasks] = useState<Array<ITask>>([

]);


const[taskBeingEdited, setTaskBeingEdited]=useState<ITask | null> (null);

useEffect(()=>{
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImI5YzhiOWY1LTM4MjEtNGNmNy05Y2MxLTFmMjY1ZjhiYzkwZiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJuaXRhIGhvdGkiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJuaXRhQGxpdmUuY29tIiwiU2VjdXJpdHlTdGFtcCI6IkRFUE9FMjRaTFhNMkNPWFBLSkI2S1ZZSllGNDJMREFBIiwiZXhwIjoxNzQ2NDU2MzMxLCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo3MTg3IiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzE4NyJ9.VZPRW9uZoM3EM3AgXnSIAvjwPRQsF3scQ8sMKAF5Fy4";
            axios.post('https://localhost:7187/api/Issue/GetAllIssues',{
                "text": "",
                "userIds": [
             ""],

              },{ headers: {"Authorization" : `Bearer ${token}`} }).then((res)=>{

                setTasksFromBack(res.data.data);
              
            })
},[])


const handleDeleteTask =(id:number) => {
const updatedTasks = tasks.filter((task) => task.id !== id);
setTasks(updatedTasks);
console.log("Deleting task with ID: " , id)
}

const handleEditTask=(id:number)=>{
const task = tasks.find(t => t.id === id);
if(task){
setTaskBeingEdited(task);
}
}



return (
<div className='full-page'>
<div className='dashboard-page'>
<div className="top-section">
<h2>Tasks</h2>
<button className='task-btn'>New Task ✚</button>
</div>
<div className="tasks-list">
<TasksContainer name='To Do' tasks={tasksFromBack.toDo} backgroundColor='rgba(188, 206, 234 , 0.3)' borderColor='rgb(83, 135, 219)' onDelete={handleDeleteTask} onEdit={handleEditTask}/>
<TasksContainer name='In Progress' tasks={tasksFromBack.inprogress} backgroundColor='rgba(245, 216, 169,0.3)' borderColor='rgb(221, 173, 97)' onDelete={handleDeleteTask} onEdit={handleEditTask}/>
<TasksContainer name='Review' tasks={tasksFromBack.review} backgroundColor='rgba( 245, 176, 169,0.3)' borderColor='rgb(227, 138, 128)' onDelete={handleDeleteTask} onEdit={handleEditTask}/>
<TasksContainer name='Done' tasks={tasksFromBack.done} backgroundColor='rgba(186, 216, 156, 0.3)' borderColor='rgb(149, 186, 112)' onDelete={handleDeleteTask} onEdit={handleEditTask}/>
</div>
</div>
{taskBeingEdited && (
<EditTaskModal
task={taskBeingEdited}
onSave={(updatedTask) => {
setTasks(prev =>
prev.map(t => t.id === updatedTask.id ? updatedTask : t)
);
setTaskBeingEdited(null);
}}
onCancel={() => setTaskBeingEdited(null)}
/>
)}


</div>
)
}

export default TasksDashboard