import { ITask } from '../../types/ITask/ITask'
import './TaskComponent.css'; 


interface ITaskComponent {
    task:ITask;
    onDelete:(id:number) => void;
    onEdit:(id:number) => void;
}

const TaskComponent = ({task,onDelete,onEdit}:ITaskComponent) => {

  const handleEdit = () => {
    onEdit(task.id);
    }
    
    const handleDelete = () => {
      onDelete(task.id)
    }

  return (
    <div className='task-component'>

<div className='task-content' >
    <div onClick={handleEdit}>✎</div>
    <div onClick={handleDelete}>🗑️</div> 
        </div>
        <div>
            {task.title}
        </div>
      
    </div>
  )
}

export default TaskComponent