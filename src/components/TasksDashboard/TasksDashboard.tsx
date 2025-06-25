import { useEffect, useState } from 'react';
import { ITask } from '../../types/ITask/ITask';
import TasksContainer from '../TasksContainer/TasksContainer';
import EditTaskModal from '../EditTask/EditTaskModal';
import axios from 'axios';
import './TasksDashboard.css';

const TasksDashboard = () => {
  // const names = [{name:"rina<3",age:"25"}, {name:"anita<3",age:"35"}];
  const [tasksFromBack, setTasksFromBack] = useState<{
    toDo: Array<any>,
    inprogress: Array<any>,
    review: Array<any>,
    done: Array<any>,
  }>({
    toDo: [],
    inprogress: [],
    review: [],
    done: []
  });
  const [tasks, setTasks] = useState<Array<ITask>>([]);
  const [taskBeingEdited, setTaskBeingEdited] = useState<ITask | null>(null);
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImI5YzhiOWY1LTM4MjEtNGNmNy05Y2MxLTFmMjY1ZjhiYzkwZiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJuaXRhIGhvdGkiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJuaXRhQGxpdmUuY29tIiwiU2VjdXJpdHlTdGFtcCI6IkRFUE9FMjRaTFhNMkNPWFBLSkI2S1ZZSllGNDJMREFBIiwiZXhwIjoxNzQ2NzI2NTI3LCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo3MTg3IiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzE4NyJ9.YchAPKD0OziLETccwHNdBbIgSfcH4j0R8ZXHY1ycQTA";

//

  useEffect(() => {
    getData();
  },[])

  const handleDeleteTask = (id: number) => {
    axios.delete(`https://localhost:7187/api/Issue/${id}`, { headers: { "Authorization": `Bearer ${token}` } }).then((res) => {
      if(res.status == 200) {
        getData();
      }
    });
  }

  const setTaskToEdit = (task: ITask) => {
    setTaskBeingEdited(task);
  }

  const getData = async () => {
    axios.post('https://localhost:7187/api/Issue/GetAllIssues', {
      "text": "",
      "userIds": [""],

    }, { headers: { "Authorization": `Bearer ${token}` } }).then((res) => {

      setTasksFromBack(res.data.data);
      setTasks(res.data.data);

    });


  }

  return (
    <div className='full-page'>
      <div className='dashboard-page'>
        <div className="top-section">
          <h2 className='title'>Tasks</h2>
          <button className='task-btn'>New Task ✚ </button>
        </div>
        <div className="tasks-list">
          <TasksContainer name='To Do' tasks={tasksFromBack.toDo} backgroundColor='rgba(188, 206, 234 , 0.3)' borderColor='rgb(83, 135, 219)' onDelete={handleDeleteTask} setTaskToEdit={setTaskToEdit} />
          <TasksContainer name='In Progress' tasks={tasksFromBack.inprogress} backgroundColor='rgba(245, 216, 169,0.3)' borderColor='rgb(221, 173, 97)' onDelete={handleDeleteTask} setTaskToEdit={setTaskToEdit} />
          <TasksContainer name='Review' tasks={tasksFromBack.review} backgroundColor='rgba( 245, 176, 169,0.3)' borderColor='rgb(227, 138, 128)' onDelete={handleDeleteTask} setTaskToEdit={setTaskToEdit} />
          <TasksContainer name='Done' tasks={tasksFromBack.done} backgroundColor='rgba(186, 216, 156, 0.3)' borderColor='rgb(149, 186, 112)' onDelete={handleDeleteTask} setTaskToEdit={setTaskToEdit} />
        </div>
      </div>

      {taskBeingEdited && (
        <EditTaskModal
          task={taskBeingEdited}
          onSave={async (updatedTask) => {
            await getData();













            setTaskBeingEdited(null);
          }}
          onCancel={() => setTaskBeingEdited(null)}
        />
      )}


    </div>
  )
}

export default TasksDashboard
