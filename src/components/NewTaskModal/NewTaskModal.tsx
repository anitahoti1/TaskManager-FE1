import ReactDOM from 'react-dom';
import './NewTaskModal.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ITask } from '../../types/ITask/ITask';
import './NewTaskModal.css';
import { ETaskStatus } from './../../enums/ETaskStatus/ETaskStatus';

interface Props {
  onClose: () => void;
  onTaskCreated: (newTask: ITask) => void;
}

const NewTaskModal = ({ onClose, onTaskCreated }: Props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assigneeId, setAssigneeId] = useState('');
  const [status, setStatus] = useState(ETaskStatus.ToDo);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const token = localStorage.getItem('token');
  const [users, setUsers] = useState<{ id: string; fullName: string }[]>([]);

  useEffect(() => {
    if (!token) {
      setError('No auth token found.');
      return;
    }
    axios
      .get('https://localhost:7095/api/Users/users', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUsers(res.data.data);
        setError('');
      })
      .catch(() => {
        setError('Failed to fetch users.');
      });
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setError('Title is required.');
      return;
    }

    setError('');
    try {
      const response = await axios.post(
        'https://localhost:7095/api/Issue',
        {
          title,
          description,
          assigneeId: assigneeId || null,
          status: status,
          priority: 1,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      onTaskCreated(response.data);
      setSuccess('Task created successfully!');
      setTimeout(() => {
        onClose();
        setSuccess('');
      }, 1000);
    } catch (err) {
      setError('Failed to create task.');
    }
  };

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>Create New Task</h3>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
  <h3>Create New Task</h3>
  <p>Modal is working ✅</p>
        <form onSubmit={handleSubmit}>
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

          <label>Assignee</label>
          <select
            name="assigneeId"
            value={assigneeId}
            onChange={(e) => setAssigneeId(e.target.value)}
          >
            <option value="">Select Assignee</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.fullName}
              </option>
            ))}
          </select>

          <label>Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(Number(e.target.value))}
          >
            <option value={ETaskStatus.ToDo}>To Do</option>
            <option value={ETaskStatus.InProgress}>In Progress</option>
            <option value={ETaskStatus.Review}>Review</option>
            <option value={ETaskStatus.Done}>Done</option>
          </select>

          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}

          <div className="buttons">
            <button type="submit">Create</button>
            <button type="button" className="cancel" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
      </div>
    </div>,
    document.body
  );
};

export default NewTaskModal;
