import { ETaskStatus } from '../../enums/ETaskStatus/ETaskStatus';
import { ITask } from '../../types/ITask/ITask';
import TasksContainer from '../TasksContainer/TasksContainer';
import './TasksDashboard.css';
import { useState } from 'react';
import EditTaskModal from '../EditTask/EditTaskModal';

const TasksDashboard = () => {
  // const names = [{name:"rina<3",age:"25"}, {name:"anita<3",age:"35"}];
  const [tasks, setTasks] = useState<Array<ITask>>([
    { id: 1, title: "Login", description: "Login Page", assigneeId: 1, status: 1, priority: 1 },
    { id: 2, title: "Login", description: "Login Page", assigneeId: 3, status: 4, priority: 3 },
    { id: 3, title: "Sign Up", description: "Sign Up Page", assigneeId: 2, status: 2, priority: 2 },
    { id: 4, title: "Tasks", description: "Display Tasks Page", assigneeId: 1, status: 2, priority: 2 },
    { id: 5, title: "Landing", description: "Landing Page", assigneeId: 2, status: 3, priority: 4 },
    { id: 6, title: "Forgot Password", description: "Forgot Password Page", assigneeId: 3, status: 1, priority: 3 },
    { id: 7, title: "Dashboard", description: "Dashboard Page", assigneeId: 1, status: 1, priority: 1 },
    { id: 8, title: "User Profile", description: "User Profile Page", assigneeId: 2, status: 4, priority: 2 },
    { id: 9, title: "Settings", description: "Settings Page", assigneeId: 1, status: 2, priority: 3 },
    { id: 10, title: "Task Details", description: "Task Details Page", assigneeId: 3, status: 3, priority: 4 },
    { id: 11, title: "Notifications", description: "Notifications Page", assigneeId: 2, status: 4, priority: 1 },
    { id: 12, title: "Messages", description: "Messages Page", assigneeId: 1, status: 1, priority: 2 },
    { id: 13, title: "Reports", description: "Reports Page", assigneeId: 3, status: 2, priority: 3 },
    { id: 14, title: "Analytics", description: "Analytics Page", assigneeId: 2, status: 3, priority: 4 },
    { id: 15, title: "Integration", description: "Integration Page", assigneeId: 1, status: 4, priority: 1 },
    { id: 16, title: "Billing", description: "Billing Page", assigneeId: 3, status: 1, priority: 2 },
    { id: 17, title: "Team Management", description: "Team Management Page", assigneeId: 2, status: 2, priority: 3 },
    { id: 18, title: "Support", description: "Support Page", assigneeId: 1, status: 3, priority: 4 },
    { id: 19, title: "Activity Logs", description: "Activity Logs Page", assigneeId: 2, status: 4, priority: 2 },
    { id: 20, title: "Calendar", description: "Calendar Page", assigneeId: 3, status: 1, priority: 3 },
    { id: 21, title: "Admin Dashboard", description: "Admin Dashboard", assigneeId: 1, status: 2, priority: 4 },
    { id: 22, title: "SEO Settings", description: "SEO Settings Page", assigneeId: 2, status: 3, priority: 2 },
    { id: 23, title: "Backup & Restore", description: "Backup & Restore Page", assigneeId: 3, status: 4, priority: 1 },
    { id: 24, title: "User Roles", description: "User Roles Page", assigneeId: 1, status: 1, priority: 4 },
    { id: 25, title: "Email Templates", description: "Email Templates Page", assigneeId: 2, status: 2, priority: 3 },
    { id: 26, title: "API Keys", description: "API Keys Page", assigneeId: 3, status: 3, priority: 2 },
    { id: 27, title: "Logs Viewer", description: "Logs Viewer Page", assigneeId: 1, status: 4, priority: 1 },
    { id: 28, title: "Import/Export", description: "Import/Export Page", assigneeId: 2, status: 1, priority: 2 },
    { id: 29, title: "Change Password", description: "Change Password Page", assigneeId: 3, status: 2, priority: 3 },
    { id: 30, title: "Terms & Conditions", description: "Terms & Conditions Page", assigneeId: 1, status: 3, priority: 4 },
    { id: 31, title: "Privacy Policy", description: "Privacy Policy Page", assigneeId: 2, status: 4, priority: 1 },
    { id: 32, title: "FAQ", description: "FAQ Page", assigneeId: 3, status: 1, priority: 2 },
    { id: 33, title: "Contact Us", description: "Contact Us Page", assigneeId: 1, status: 2, priority: 3 },
    { id: 34, title: "Feedback", description: "Feedback Page", assigneeId: 2, status: 3, priority: 4 },
    { id: 35, title: "Blog", description: "Blog Page", assigneeId: 3, status: 4, priority: 2 },
    { id: 36, title: "Newsletter", description: "Newsletter Page", assigneeId: 1, status: 1, priority: 3 },
    { id: 37, title: "Cookie Settings", description: "Cookie Settings Page", assigneeId: 2, status: 2, priority: 4 },
    { id: 38, title: "About Us", description: "About Us Page", assigneeId: 3, status: 3, priority: 1 },
    { id: 39, title: "Careers", description: "Careers Page", assigneeId: 1, status: 4, priority: 2 },
    { id: 40, title: "Press", description: "Press Page", assigneeId: 2, status: 1, priority: 3 }
  ]);


  const[taskBeingEdited, setTaskBeingEdited]=useState<ITask | null> (null);

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