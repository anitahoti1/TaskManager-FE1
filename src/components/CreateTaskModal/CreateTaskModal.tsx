
import Modal from 'react-modal';
import { useState } from 'react';
import './NewTaskModal.css';
import { ETaskStatus } from '../../enums/ETaskStatus/ETaskStatus';
import { ITask } from './../../types/ITask/ITask';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: ITask) => void;
}

const NewTaskModal: React.FC<Props> = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');


  const handleCreate = () => {
    if (title.trim()) {
      onSave({
        id: Date.now(),
        title,
        description,
        status: ETaskStatus.ToDo,
        assigneeId: 0,
        priority: 0
      });
      setTitle('');
      setDescription('');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Create New Task"
      style={{
        content: { position: 'fixed',top: '50%',left: '50%',transform: 'translate(-50%, -50%)', padding: '30px', width: '320px',  height: '280px',
        },
      }}
    >
      <h3 className="modal-title">New Task</h3>
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="modal-input"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="modal-input"
        rows={3}
      />
      <div className="modal-buttons">
        <button onClick={onClose}>Cancel</button>
        <button onClick={handleCreate}>Create</button>
      </div>
    </Modal>
  );
};

export default NewTaskModal;