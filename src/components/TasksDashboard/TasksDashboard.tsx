import { ETaskStatus } from '../../enums/ETaskStatus/ETaskStatus';
import { ITask } from '../../types/ITask/ITask';
import TasksContainer from '../TasksContainer/TasksContainer';
import './TasksDashboard.css';
import { useState } from 'react';

const TasksDashboard = () => {
  // const names = [{name:"rina<3",age:"25"}, {name:"anita<3",age:"35"}];
  const [tasks, setTasks] = useState<Array<ITask>>([
    { id: 1, description: "Login Page", assigneeId: 1, status: 1, priority: 1 },
  { id: 2, description: "Login Page", assigneeId: 3, status: 4, priority: 3 },
  { id: 3, description: "Sign Up Page", assigneeId: 2, status: 2, priority: 2 },
  { id: 4, description: "Display Tasks Page", assigneeId: 1, status: 2, priority: 2 },
  { id: 5, description: "Landing Page", assigneeId: 2, status: 3, priority: 4 },
  { id: 6, description: "Forgot Password Page", assigneeId: 3, status: 1, priority: 3 },
  { id: 7, description: "Dashboard Page", assigneeId: 1, status: 1, priority: 1 },
  { id: 8, description: "User Profile Page", assigneeId: 2, status: 4, priority: 2 },
  { id: 9, description: "Settings Page", assigneeId: 1, status: 2, priority: 3 },
  { id: 10, description: "Task Details Page", assigneeId: 3, status: 3, priority: 4 },
  { id: 11, description: "Notifications Page", assigneeId: 2, status: 4, priority: 1 },
  { id: 12, description: "Messages Page", assigneeId: 1, status: 1, priority: 2 },
  { id: 13, description: "Reports Page", assigneeId: 3, status: 2, priority: 3 },
  { id: 14, description: "Analytics Page", assigneeId: 2, status: 3, priority: 4 },
  { id: 15, description: "Integration Page", assigneeId: 1, status: 4, priority: 1 },
  { id: 16, description: "Billing Page", assigneeId: 3, status: 1, priority: 2 },
  { id: 17, description: "Team Management Page", assigneeId: 2, status: 2, priority: 3 },
  { id: 18, description: "Support Page", assigneeId: 1, status: 3, priority: 4 },
  { id: 19, description: "Activity Logs Page", assigneeId: 2, status: 4, priority: 2 },
  { id: 20, description: "Calendar Page", assigneeId: 3, status: 1, priority: 3 },
  { id: 21, description: "Admin Dashboard", assigneeId: 1, status: 2, priority: 4 },
  { id: 22, description: "SEO Settings Page", assigneeId: 2, status: 3, priority: 2 },
  { id: 23, description: "Backup & Restore Page", assigneeId: 3, status: 4, priority: 1 },
  { id: 24, description: "User Roles Page", assigneeId: 1, status: 1, priority: 4 },
  { id: 25, description: "Email Templates Page", assigneeId: 2, status: 2, priority: 3 },
  { id: 26, description: "API Keys Page", assigneeId: 3, status: 3, priority: 2 },
  { id: 27, description: "Logs Viewer Page", assigneeId: 1, status: 4, priority: 1 },
  { id: 28, description: "Import/Export Page", assigneeId: 2, status: 1, priority: 2 },
  { id: 29, description: "Change Password Page", assigneeId: 3, status: 2, priority: 3 },
  { id: 30, description: "Terms & Conditions Page", assigneeId: 1, status: 3, priority: 4 },
  { id: 31, description: "Privacy Policy Page", assigneeId: 2, status: 4, priority: 1 },
  { id: 32, description: "FAQ Page", assigneeId: 3, status: 1, priority: 2 },
  { id: 33, description: "Contact Us Page", assigneeId: 1, status: 2, priority: 3 },
  { id: 34, description: "Feedback Page", assigneeId: 2, status: 3, priority: 4 },
  { id: 35, description: "Blog Page", assigneeId: 3, status: 4, priority: 2 },
  { id: 36, description: "Newsletter Page", assigneeId: 1, status: 1, priority: 3 },
  { id: 37, description: "Cookie Settings Page", assigneeId: 2, status: 2, priority: 4 },
  { id: 38, description: "About Us Page", assigneeId: 3, status: 3, priority: 1 },
  { id: 39, description: "Careers Page", assigneeId: 1, status: 4, priority: 2 },
  { id: 40, description: "Press Page", assigneeId: 2, status: 1, priority: 3 }
  ]);





























  const handleDeleteTask =(id:number) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    console.log("Deleting task with ID: " , id)
  }

  const handleEditTask=(id:number)=>{
    console.log("Editing task with ID: " , id);
  }

  const tasksInTodo = tasks.filter((task) => task.status === 1);
  const tasksInProgress = tasks.filter((task) => task.status === 2);
  const tasksInReview = tasks.filter((task) => task.status === 3);
  const tasksInDone = tasks.filter((task) => task.status === 4);











  return (
    <div className='full-page'>
      <div className='dashboard-page'>
        <div className="top-section">
          <h2>Tasks</h2>
          <button className='task-btn'>New Task ✚</button>
        </div>
        <div className="tasks-list">
          <TasksContainer name='To Do' tasks={tasksInTodo} backgroundColor='rgba(188, 206, 234 , 0.3)' borderColor='rgb(83, 135, 219)' onDelete={handleDeleteTask} onEdit={handleEditTask}/>
          <TasksContainer name='In Progress' tasks={tasksInProgress} backgroundColor='rgba(245, 216, 169,0.3)' borderColor='rgb(221, 173, 97)' onDelete={handleDeleteTask} onEdit={handleEditTask}/>
          <TasksContainer name='Review' tasks={tasksInReview} backgroundColor='rgba( 245, 176, 169,0.3)' borderColor='rgb(227, 138, 128)' onDelete={handleDeleteTask} onEdit={handleEditTask}/>
          <TasksContainer name='Done' tasks={tasksInDone} backgroundColor='rgba(186, 216, 156, 0.3)' borderColor='rgb(149, 186, 112)' onDelete={handleDeleteTask} onEdit={handleEditTask}/>
        </div>
      </div>
    </div>

  )
}

export default TasksDashboard