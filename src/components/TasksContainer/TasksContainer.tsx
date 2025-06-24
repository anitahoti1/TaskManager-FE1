import { ITask } from '../../types/ITask/ITask';
import TaskComponent from '../TaskComponent/TaskComponent';
import './TaskContainer.css'

interface ITasksContainer {
    name: string;
    tasks: Array<ITask>;
    backgroundColor: string;
    borderColor:string;
    onDelete:(id:number) => void;
    onEdit: (id:number) => void;
}

const TasksContainer = ({name,tasks,backgroundColor,borderColor,onDelete,onEdit}:ITasksContainer) => {
  console.log(tasks,"at container")
  return (
    <div className='tasks-container' style={{backgroundColor:backgroundColor , borderColor:backgroundColor}}>
        <span style={{color:borderColor}}  className='container-title'>{name}</span>
        <div className='inner-container'>
        {tasks && tasks.length > 0 && tasks.map((task) => (
          <TaskComponent key={task.id} task={task} onDelete={onDelete} onEdit={onEdit} />
        ))}
        </div>


    </div>
  )
}

export default TasksContainer