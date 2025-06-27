import './NewTaskModal.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ITask } from '../../types/ITask/ITask';
import { Token } from '@mui/icons-material';
import { ETaskStatus } from '../../enums/ETaskStatus/ETaskStatus';



interface Props {
  onClose: () => void;
  onTaskCreated: (newTask: ITask) => void;
}


const NewTaskModal = ({ onClose, onTaskCreated }: Props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assigneeId, setAssigneeId] = useState('');
  const [assignee, setAssignee] = useState('');
  const [status, setStatus] = useState(ETaskStatus.ToDo);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const token = localStorage.getItem('token');
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    axios.get('https://localhost:7095/api/Users/users', {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      setUsers(res.data.data);
    }).catch((err) => {
      setError("Failed to fetch users.");
    });
  }, []);


  const handleSubmit = async () => {

    if (!title.trim()) {
      setError('Title is required.');
      return;
    }
    console.log("token,", token)


    try {
      const response = await axios.post('https://localhost:7095/api/Issue', {

        title,
        description,
        assigneeId,
        status,
        priority: 1
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

        <label>Assignee</label>
        <select name="assigneeId" value={assigneeId} onChange={(e) => setAssigneeId(e.target.value)}>
          <option value="">Select Assignee</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.fullName}
            </option>
          ))}
        </select>

        <select value={status} onChange={(e) => setStatus(+e.target.value)}>
          <option value={ETaskStatus.ToDo}>To Do</option>
          <option value={ETaskStatus.Done}>Done</option>
          <option value={ETaskStatus.InProgress}>InProgress</option>
          <option value={ETaskStatus.Review}>Review</option>
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