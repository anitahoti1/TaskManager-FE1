import { ETaskStatus } from '../../enums/ETaskStatus/ETaskStatus';
import { ITask } from '../../types/ITask/ITask';
import TasksContainer from '../TasksContainer/TasksContainer';
import './TasksDashboard.css';

const TasksDashboard = () => {
  // const names = [{name:"rina",age:"25"}, {name:"anita",age:"35"},];
  const tasks : Array<ITask> = [
  { id: 1, description: "Login Page", assigneeId: 1, status: 1, priority: 1 },
  { id: 1, description: "Login Page", assigneeId: 3, status: 4, priority: 3 },
  { id: 1, description: "Login Page", assigneeId: 1, status: 1, priority: 1 },
  { id: 1, description: "Login Page", assigneeId: 3, status: 4, priority: 3 },
  { id: 1, description: "Login Page", assigneeId: 1, status: 1, priority: 1 },
  { id: 1, description: "Login Page", assigneeId: 3, status: 4, priority: 3 },
  { id: 1, description: "Login Page", assigneeId: 1, status: 1, priority: 1 },
  { id: 1, description: "Login Page", assigneeId: 3, status: 4, priority: 3 },
  { id: 1, description: "Login Page", assigneeId: 1, status: 1, priority: 1 },
  { id: 1, description: "Login Page", assigneeId: 3, status: 4, priority: 3 },
  { id: 1, description: "Login Page", assigneeId: 1, status: 1, priority: 1 },
  { id: 1, description: "Login Page", assigneeId: 3, status: 4, priority: 3 },
  { id: 3, description: "Display Tasks Page", assigneeId: 1, status: ETaskStatus.InProgress ,priority: 2 },
  { id: 3, description: "Display Tasks Page", assigneeId: 1, status: ETaskStatus.InProgress ,priority: 2 },
  { id: 3, description: "Display Tasks Page", assigneeId: 1, status: ETaskStatus.InProgress ,priority: 2 },
  { id: 3, description: "Display Tasks Page", assigneeId: 1, status: ETaskStatus.InProgress ,priority: 2 },
  { id: 3, description: "Display Tasks Page", assigneeId: 1, status: ETaskStatus.InProgress ,priority: 2 },
  { id: 3, description: "Display Tasks Page", assigneeId: 1, status: ETaskStatus.InProgress ,priority: 2 },
  { id: 3, description: "Display Tasks Page", assigneeId: 1, status: ETaskStatus.InProgress ,priority: 2 },
  { id: 3, description: "Display Tasks Page", assigneeId: 1, status: ETaskStatus.InProgress ,priority: 2 },
  { id: 3, description: "Display Tasks Page", assigneeId: 1, status: ETaskStatus.InProgress ,priority: 2 },
  { id: 3, description: "Display Tasks Page", assigneeId: 1, status: ETaskStatus.InProgress ,priority: 2 },
  { id: 2, description: "Landing Page", assigneeId: 2, status: 3 ,priority: 4 },
  { id: 3, description: "Display Tasks Page", assigneeId: 1, status: ETaskStatus.InProgress ,priority: 2 },
  { id: 1, description: "Sign Up Page", assigneeId: 1, status: 1, priority: 1 },
  { id: 13, description: "Login Page", assigneeId: 3, status: 4, priority: 3 },
  { id: 13, description: "Login Page", assigneeId: 3, status: 4, priority: 3 },
  { id: 13, description: "Login Page", assigneeId: 3, status: 4, priority: 3 },
  { id: 13, description: "Login Page", assigneeId: 3, status: 4, priority: 3 },
  { id: 13, description: "Login Page", assigneeId: 3, status: 4, priority: 3 },
  { id: 13, description: "Login Page", assigneeId: 3, status: 4, priority: 3 },
  { id: 13, description: "Login Page", assigneeId: 3, status: 4, priority: 3 },
  { id: 13, description: "Login Page", assigneeId: 3, status: 4, priority: 3 },
  { id: 13, description: "Login Page", assigneeId: 3, status: 4, priority: 3 },
  { id: 13, description: "Login Page", assigneeId: 3, status: 4, priority: 3 },
  { id: 13, description: "Login Page", assigneeId: 3, status: 4, priority: 3 },
  { id: 13, description: "Login Page", assigneeId: 3, status: 4, priority: 3 },
  { id: 13, description: "Login Page", assigneeId: 3, status: 4, priority: 3 },
  { id: 13, description: "Login Page", assigneeId: 3, status: 4, priority: 3 },
  { id: 13, description: "Login Page", assigneeId: 3, status: 4, priority: 3 },
  { id: 13, description: "Login Page", assigneeId: 3, status: 4, priority: 3 },
  { id: 13, description: "Login Page", assigneeId: 3, status: 4, priority: 3 },
  { id: 1, description: "Sign Up Page", assigneeId: 1, status: 1, priority: 1 },
  { id: 1, description: "Sign Up Page", assigneeId: 1, status: 1, priority: 1 },
  { id: 1, description: "Sign Up Page", assigneeId: 1, status: 1, priority: 1 },
  { id: 1, description: "Sign Up Page", assigneeId: 1, status: 1, priority: 1 },
  { id: 1, description: "Sign Up Page", assigneeId: 1, status: 1, priority: 1 },
  { id: 1, description: "Sign Up Page", assigneeId: 1, status: 1, priority: 1 },
  { id: 1, description: "Sign Up Page", assigneeId: 1, status: 1, priority: 1 },
  { id: 1, description: "Sign Up Page", assigneeId: 1, status: 1, priority: 1 },
  { id: 1, description: "Sign Up Page", assigneeId: 1, status: 1, priority: 1 },
  { id: 1, description: "Sign Up Page", assigneeId: 1, status: 1, priority: 1 },
  { id: 1, description: "Sign Up Page", assigneeId: 1, status: 1, priority: 1 },
  { id: 1, description: "Sign Up Page", assigneeId: 1, status: 1, priority: 1 },
  { id: 1, description: "Sign Up Page", assigneeId: 1, status: 1, priority: 1 },
  { id: 1, description: "Sign Up Page", assigneeId: 1, status: 1, priority: 1 },
  { id: 1, description: "Sign Up Page", assigneeId: 1, status: 1, priority: 1 },
  { id: 1, description: "Sign Up Page", assigneeId: 1, status: 1, priority: 1 },
  { id: 13, description: "Login Page", assigneeId: 3, status: 4, priority: 3 },
  { id: 12, description: "Landing Page", assigneeId: 2, status: 3 ,priority: 4 },
  { id: 5, description: "Landing Page", assigneeId: 2, status: 3 ,priority: 4 },
  { id: 7, description: "Landing Page", assigneeId: 2, status: 3 ,priority: 4 },
  { id: 8, description: "Landing Page", assigneeId: 2, status: 3 ,priority: 4 },
  { id: 12, description: "Landing Page", assigneeId: 2, status: 3 ,priority: 4 },
  { id: 5, description: "Landing Page", assigneeId: 2, status: 3 ,priority: 4 },
  { id: 7, description: "Landing Page", assigneeId: 2, status: 3 ,priority: 4 },
  { id: 8, description: "Landing Page", assigneeId: 2, status: 3 ,priority: 4 },
  { id: 9, description: "Display Tasks Page", assigneeId: 1, status: ETaskStatus.InProgress ,priority: 2 }
  ];

  const tasksInTodo = tasks.filter((task)=> task.status === 1);
  const tasksInProgress = tasks.filter((task)=> task.status === 2);
  const tasksInReview = tasks.filter((task)=> task.status === 3);
  const tasksInDone = tasks.filter((task)=> task.status === 4);


  return (
    <div className='full-page' style={{width:'100%', height:'100vh' , display:'flex' , justifyContent:'center'}}>
    <div className='dashboard-page' style={{width:'80%', height:'90%'}}>
      <div className="top-section">
        <h2>Tasks</h2>
        <button className='task-btn'>New Task ✚</button>
      </div>
      <div className="tasks-list">
        
        <TasksContainer name='To Do' tasks={tasksInTodo}  backgroundColor='rgba(188, 206, 234 , 0.3)' borderColor='rgb(72, 123, 206)' />
        <TasksContainer name='In Progress' tasks={tasksInProgress}  backgroundColor='rgba(245, 216, 169,0.3)' borderColor='rgb(221, 173, 97)'  />
        <TasksContainer name='Review' tasks={tasksInReview}  backgroundColor='rgba( 245, 176, 169,0.3)'  borderColor='rgb(227, 138, 128)'/>
        <TasksContainer name='Done' tasks={tasksInDone}  backgroundColor='rgba(207, 245, 169,0.3)' borderColor='rgb(149, 186, 112)' />


      </div>
    </div>
    </div>
  )
}

export default TasksDashboard