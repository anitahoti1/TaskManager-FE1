import { ITask } from '../../types/ITask/ITask';
import TaskComponent from '../TaskComponent/TaskComponent';
import './TasksContainer.css'

interface ITasksContainer {
    name: string;
    tasks: Array<ITask>;
    backgroundColor: string;
    borderColor:string;
    onDelete:(id:number) => void;
    setTaskToEdit: (task: ITask) => void;
}

const TasksContainer = ({name,tasks,backgroundColor,borderColor,onDelete,setTaskToEdit}:ITasksContainer) => {

  return (
    <div className='tasks-container' style={{backgroundColor:backgroundColor , borderColor:backgroundColor}}>
        <span style={{color:borderColor}}  className='container-title'>{name} </span>
        <div className='inner-container'>
          {tasks && tasks.length > 0 && tasks.map((task) => (
            <TaskComponent key={task.id} task={task} onDelete={onDelete} setTaskToEdit={setTaskToEdit} />
          ))}
        </div>


    </div>
  )
}

export default TasksContainer