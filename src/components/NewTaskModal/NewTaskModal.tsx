import './NewTaskModal.css';
import { useState } from 'react';
import axios from 'axios';
import { ITask } from '../../types/ITask/ITask';

interface Props {
  onClose: () => void;
  onTaskCreated: (newTask: ITask) => void;
}


const NewTaskModal = ({ onClose, onTaskCreated }: Props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignee, setAssignee] = useState('');
  const [status, setStatus] = useState('To Do');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async () => {
    if (!title.trim()) {
      setError('Title is required.');
      return;
    }

    try {
        const token = 'yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImI5YzhiOWY1LTM4MjEtNGNmNy05Y2MxLTFmMjY1ZjhiYzkwZiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJuaXRhIGhvdGkiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJuaXRhQGxpdmUuY29tIiwiU2VjdXJpdHlTdGFtcCI6IkRFUE9FMjRaTFhNMkNPWFBLSkI2S1ZZSllGNDJMREFBIiwiZXhwIjoxNzQ2NDU2MzMxLCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo3MTg3IiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzE4NyJ9.VZPRW9uZoM3EM3AgXnSIAvjwPRQsF3scQ8sMKAF5Fy4';
        const response = await axios.post('http://localhost:5080/api/Issue', {
          title,
          description,
          assignee,
          status
        }, {
          headers: { Authorization: `Bearer {token}` }
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
        <input
          type="text"
          placeholder="Assignee"
          value={assignee}
          onChange={(e) => setAssignee(e.target.value)}
        />
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