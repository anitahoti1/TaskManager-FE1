import { useEffect, useState } from 'react';
import axios from 'axios';
import { ITask } from '../../types/ITask/ITask';
import TasksContainer from '../TasksContainer/TasksContainer';
import EditTaskModal from '../EditTask/EditTaskModal';
import NewTaskModal from '../NewTaskModal/NewTaskModal';

import './TasksDashboard.css';

const TasksDashboard = () => {
  const [tasksFromBack, setTasksFromBack] = useState<{
    toDo: ITask[];
    inprogress: ITask[];
    review: ITask[];
    done: ITask[];
  }>({
    toDo: [],
    inprogress: [],
    review: [],
    done: [],
  });

  const [taskBeingEdited, setTaskBeingEdited] = useState<ITask | null>(null);
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    if (!token) return;
    try {
      const res = await axios.post(
        'https://localhost:7095/api/Issue/GetAllIssues',
        { text: '', userIds: [''] },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasksFromBack(res.data.data);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  };

  const handleDeleteTask = async (id: number) => {
    if (!token) return;
    try {
      const res = await axios.delete(`https://localhost:7095/api/Issue/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 200) {
        await getData();
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const setTaskToEdit = (task: ITask) => {
    setTaskBeingEdited(task);
  };

  return (
    <div className="full-page">
      <div className="dashboard-page">
        <div className="top-section">
          <h2 className="title">Tasks</h2>
          <button
            className="task-btn"
            onClick={() => {
               console.log('Button Clicked');
              setIsNewTaskModalOpen(true);
            }}
          >
            New Task ✚
          </button>
        </div>

        <div className="tasks-list">
          <TasksContainer
            name="To Do"
            tasks={tasksFromBack.toDo}
            backgroundColor="rgba(188, 206, 234 , 0.3)"
            borderColor="rgb(83, 135, 219)"
            onDelete={handleDeleteTask}
            setTaskToEdit={setTaskToEdit}
          />
          <TasksContainer
            name="In Progress"
            tasks={tasksFromBack.inprogress}
            backgroundColor="rgba(245, 216, 169,0.3)"
            borderColor="rgb(221, 173, 97)"
            onDelete={handleDeleteTask}
            setTaskToEdit={setTaskToEdit}
          />
          <TasksContainer
            name="Review"
            tasks={tasksFromBack.review}
            backgroundColor="rgba(245, 176, 169, 0.3)"
            borderColor="rgb(227, 138, 128)"
            onDelete={handleDeleteTask}
            setTaskToEdit={setTaskToEdit}
          />
          <TasksContainer
            name="Done"
            tasks={tasksFromBack.done}
            backgroundColor="rgba(186, 216, 156, 0.3)"
            borderColor="rgb(149, 186, 112)"
            onDelete={handleDeleteTask}
            setTaskToEdit={setTaskToEdit}
          />
        </div>
      </div>

      {taskBeingEdited && (
        <EditTaskModal
          task={taskBeingEdited}
          onSave={async () => {
            await getData();
            setTaskBeingEdited(null);
          }}
          onCancel={() => setTaskBeingEdited(null)}
        />
      )}

      {isNewTaskModalOpen && (
  <>
    {console.log('Modal is open')}
    <NewTaskModal
      onClose={() => setIsNewTaskModalOpen(false)}
      onTaskCreated={async (newTask) => {
        await getData();
        setIsNewTaskModalOpen(false);
      }}
    />
  </>
)}

    </div>
  );
};

export default TasksDashboard;
