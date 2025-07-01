import { useEffect, useState } from "react";
import axios from "axios";
import './AdminPanel.css';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get("https://localhost:7095/api/Admin/users", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => {
        setUsers(res.data.data);
      })
      .catch((err) => {
        console.error("Failed to fetch users", err);
      });
  }, []);

  return (
    <div className="admin-container">
      <h2>Admin Panel - All Users</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u: any) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.fullName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
