import './NewTaskModal.css';
import { useState } from 'react';
import axios from 'axios';
import { ITask } from '../types/ITask/ITask';

interface Props {
  onClose: () => void;
  onTaskCreated: (newTask: ITask) => void;
}

const NewTaskModal = ({ onClose, onTaskCreated }: Props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assigneeId,setAssigneeId] = useState('');
  const [status, setStatus] = useState('To Do');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async () => {
    if (!title.trim()) {
      setError('Title is required.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5080/api/Issue', {
        title,
        description,
        assigneeId,
        status,
        priority:1
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });


      onTaskCreated(response.data);
      setSuccess('Task created successfully!');
      setTimeout(() => onClose(), 1000);
    } catch (err) {
      setError('Failed to create task.');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Create New Task</h3>
        <input
          type="text"
          placeholder="Title *"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

         {/* <textarea
         
          placeholder="Assignee"
          value={assigneeId}
          onChange={(e) => setAssigneeId(e.target.value)}
        /> */}

        <select value={assigneeId} onChange={(e) => setAssigneeId(e.target.value)}>
          <option value="assigneeId">6cf1ec27-ca19-49d1-9136-15d4b22ea3d1</option>
          <option value="assigneeId">6cf1ec27-ca19-49d1-9136-15d4b22ea3d1</option>
          <option value="assigneeId">6cf1ec27-ca19-49d1-9136-15d4b22ea3d1</option>


          </select>


        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="To Do">To Do</option>

        </select>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <div className="buttons">
          <button onClick={handleSubmit}>Create</button>
          <button onClick={onClose} className="cancel">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default NewTaskModal;