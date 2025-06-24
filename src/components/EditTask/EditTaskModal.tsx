import { useState, useEffect } from 'react';
import { ITask } from '../../types/ITask/ITask';
import { toast } from 'react-toastify';
import './EditTaskModal.css';

interface Props {
task: ITask;
onSave: (updatedTask: ITask) => void;
onCancel: () => void;
}

const EditTaskModal = ({ task, onSave, onCancel }: Props) => {
const [title, setTitle] = useState(task.title);
const [description, setDescription] = useState(task.description);
const [assigneeId, setAssigneeId] = useState(task.assigneeId);
const [status, setStatus] = useState(task.status);

const handleSubmit = () => {
if (!title.trim() || !description.trim()) {
toast.error("Title and Description are required!");
return;
}

onSave({
...task,
title,
description,
assigneeId,
status,
});

toast.success("Task updated successfully!");
};

return (
<div className="edit-modal">
<h3>Edit Task</h3>
<input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
<textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
<input
type="number"
value={assigneeId}
onChange={(e) => setAssigneeId(Number(e.target.value))}
placeholder="Assignee ID"
/>
<select value={status} onChange={(e) => setStatus(Number(e.target.value))}>
<option value={1}>To Do</option>
<option value={2}>In Progress</option>
<option value={3}>Review</option>
<option value={4}>Done</option>
</select>
<div className="modal-buttons">
<button onClick={onCancel}>Cancel</button>
<button onClick={handleSubmit}>Save</button>

</div>
</div>
);
};

export default EditTaskModal;