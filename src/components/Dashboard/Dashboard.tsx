import React, { use, useEffect, useState } from 'react';
import './Dashboard.css';
import userImage from "../../assets/user.jpg";
import { useAuth } from "./../../hooks/AuthProvider";
import { useNavigate } from 'react-router';
import axios from 'axios';
// import { AuthContext } from '../contexts/Authcontext';

const Dashboard: React.FC = () => {


  const navigate = useNavigate();
  const { user } = useAuth();
  //const [dashboardData, setDashboardData] = useState(null);




  const [taskSummary, setTaskSummary] = useState([
    { label: 'To Do', count: 0, color: 'red' },
    { label: 'In Progress', count: 0, color: 'yellow' },
    { label: 'Review', count: 0, color: 'green' },
    { label: 'Done', count: 0, color: 'blue' },
  ]);

  useEffect(() => {
    //todo me thirr reqwuestin

    const fetchTaskCounts = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await axios.get('http://localhost:5080/api/Issue/user/issue-count', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data.data
        //const totalTasks = taskSummary.reduce((sum, task) => sum + task.count, 0);

        setTaskSummary([
          { label: 'To Do', count: data.toDo, color: 'red' },
          { label: 'In Progress', count: data.inProgress, color: 'yellow' },
          { label: 'Review', count: data.review, color: 'green' },
          { label: 'Done', count: data.done , color: 'blue' },
        ]);
      } catch (error) {
        console.error('Erorr:', error);
      }
    };

    fetchTaskCounts();

  }, [])





  return (

    <div className="dashboard">
      <div className="welcome-card">
        <div>
          <h2>Welcome {user.firstName}</h2>
          {/* <p>You have {totalTasks} project{totalTasks !== 1 ? 's' : ''}to finish and already completed 100% from your monthly level. Keep going to your goal.</p> */}
          <p>You have 0 project to finish and already completed 100% from your monthly level. Keep going to your goal.</p>
       <button className="tasks-button" onClick={()=>navigate('/tasksdashboard')}>View Tasks</button>
        </div>
       <div className="welcome-img">
          <img src={userImage} alt="User" className='welcome-img' />
        </div>
      </div>
      <div className="task-summary">
        {taskSummary.map((task, idx) => (
          <div key={idx} className={`task-card ${task.color}`}>
            <h4>{task.label}</h4>
            <p>{task.count} Tasks</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;