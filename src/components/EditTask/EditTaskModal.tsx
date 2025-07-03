import { useState, useEffect } from 'react';
import { ITask } from '../../types/ITask/ITask';
import axios from 'axios';
import './EditTaskModal.css';

interface IEditTaskModal {
  task: ITask;
  onSave: (updatedTask: ITask) => void;
  onCancel: () => void;
}

const EditTaskModal = ({ task, onSave, onCancel }: IEditTaskModal) => {
  const [formData, setFormData] = useState({
    title: task?.title || '',
    description: task?.description || '',
    assigneeId: task?.assigneeId || '',
    status: task?.status?.toString() || '', 
  });

  const [users, setUsers] = useState<any[]>([]);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios
      .get('https://localhost:7095/api/Users/users', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUsers(res.data.data);
      })
      .catch(() => {
        setError('Failed to fetch users.');
      });
  }, [token]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value, 
    }));
  };

  const handleSubmit = async () => {
    if (
      !formData.title.trim() ||
      !formData.description.trim() ||
      !formData.assigneeId ||
      !formData.status
    ) {
      setError('All inputs required.');
      return;
    }

    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        assigneeId: formData.assigneeId,
        status: parseInt(formData.status), 
        priority: 1, 
      };

      const res = await axios.put(
        `https://localhost:7095/api/Issue/${task.id}`, 
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.status === 200) {
        onSave(res.data);
      } else {
        setError('Update failed. Try again.');
      }
    } catch (err: any) {
      setError('Something went wrong.');
    }
  };

  return (
    <div className="edit-modal-overlay">
      <div className="edit-modal">
        <h2>Edit Task</h2>
        <div className="edit-task-actions">
          <label>Title</label>
          <input name="title" value={formData.title} onChange={handleChange} />


          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />

          <select
            name="assigneeId"
            value={formData.assigneeId}
            onChange={handleChange}
          >
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.fullName}
              </option>
            ))}
          </select>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="">Select Status</option>
            <option value="1">To Do</option>
            <option value="2">In Progress</option>
            <option value="3">Review</option>
            <option value="4">Done</option>
          </select>

          {error && <div className="error-message">{error}</div>}

          <div className="modal-buttons">
            <button onClick={handleSubmit}>Save</button>
            <button onClick={onCancel}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTaskModal;
