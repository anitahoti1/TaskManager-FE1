import { useEffect, useState } from "react";
import axios from "axios";
import './AdminPage.css';

const AdminPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("https://localhost:7095/api/Admin/users", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUsers(res.data.data);
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="admin-container">
      <h2>All Users</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>User ID</th>
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

export default AdminPage;
