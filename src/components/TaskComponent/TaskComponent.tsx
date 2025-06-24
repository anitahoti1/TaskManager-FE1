import { ITask } from '../../types/ITask/ITask'
import './TaskComponent.css'; 


interface ITaskComponent {
    task:ITask;
}

const TaskComponent = ({task}:ITaskComponent) => {

  const handleEdit = () => {
    console.log('Editing task',task.id);
    }
    
    const handleDelete = () => {
    console.log('Deleting task',task.id);
    }

  return (
    <div className='task-component'>

<div className='task-content' >
    <div onClick={handleEdit}>✎</div>
    <div onClick={handleDelete}>🗑️</div>
        </div>
        <div>
            {task.description}
        </div>
      
    </div>
  )
}

export default TaskComponent