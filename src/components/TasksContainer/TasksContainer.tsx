import { ITask } from '../../types/ITask/ITask';
import TaskComponent from './../TaskComponent/TaskComponent';
import './TaskContainer.css'

interface ITasksContainer {
    name: string;
    tasks: Array<ITask>;
    backgroundColor: string;
    borderColor:string;


}

const TasksContainer = ({name,tasks,backgroundColor,borderColor}:ITasksContainer) => {
  return (
    <div className='tasks-container' style={{backgroundColor:backgroundColor , borderColor:backgroundColor}}>
        <span style={{color:borderColor}}  className='container-title'>{name}</span>
        <div className='inner-container'>
        {tasks.map((task)=>{
            return <TaskComponent task={task}/>
        })}
        </div>

      
    </div>
  )
}

export default TasksContainer