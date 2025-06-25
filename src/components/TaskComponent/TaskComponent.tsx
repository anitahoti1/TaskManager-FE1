
import { ITask } from '../../types/ITask/ITask'
import './TaskComponent.css'; 


interface ITaskComponent {
    task:ITask;
    onDelete:(id:number) => void;
    setTaskToEdit:(task:ITask ) => void;
}

const TaskComponent = ({task,onDelete,setTaskToEdit}:ITaskComponent) => {

  const handleEdit = () => {
    setTaskToEdit(task);
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