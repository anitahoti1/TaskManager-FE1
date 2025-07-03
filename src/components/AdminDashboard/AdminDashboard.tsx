import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../hooks/AuthProvider";
import { useNavigate } from "react-router";

const AdminDashboard = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const { setIsAuthenticated, setUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("https://localhost:7095/api/Admin/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data.data);
      } catch (error) {
        console.error("Failed to fetch users", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const logout = () => {
    setIsAuthenticated(false);
    setUser(undefined);
    localStorage.clear();
    navigate("/login");
  };

  const menuItems = [
    { name: "Users", href: "/admin", icon: "bi-people" },
    { name: "Tasks", href: "/tasksdashboard", icon: "bi-list-task" },
  ];

  const currentPath = window.location.pathname;

  const handleDelete = async (userId: string) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`https://localhost:7095/api/Admin/delete/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsers((prevUsers) => prevUsers.filter((u) => u.id !== userId));
    } catch (error) {
      console.error("Failed to delete user", error);
      alert("Error deleting user.");
    }
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand navbar-light bg-light px-3">
        <a className="navbar-brand" href="/">
          Admin Dashboard
        </a>
        <div className="ms-auto">
          <button className="btn btn-outline-danger" onClick={logout}>
            <i className="bi bi-box-arrow-right"></i> Logout
          </button>
        </div>
      </nav>

      <div className="d-flex">
        {/* Sidebar */}
        <nav
          className="d-flex flex-column flex-shrink-0 p-3 bg-light"
          style={{ width: "220px", height: "100vh" }}
        >
          <ul className="nav nav-pills flex-column mb-auto">
            {menuItems.map((item) => (
              <li className="nav-item" key={item.name}>
                <a
                  href={item.href}
                  className={`nav-link ${currentPath === item.href ? "active" : "link-dark"
                    }`}
                  aria-current={currentPath === item.href ? "page" : undefined}
                >
                  <i className={`bi ${item.icon} me-2`}></i>
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Main Content */}
        <main className="flex-grow-1 p-4">
          <h2>Users List</h2>

          {loading ? (
            <div>Loading users...</div>
          ) : (
            <div className="table-responsive shadow-sm">
              <table className="table table-striped table-hover table-bordered">
                <thead className="table-dark">
                  <tr>
                    <th>User ID</th>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Roles</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="text-center">
                        No users found
                      </td>
                    </tr>
                  ) : (
                    users.map((user) => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.fullName}</td>
                        <td>{user.email}</td>
                        <td>{(user.roles || []).join(", ")}</td>         
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
