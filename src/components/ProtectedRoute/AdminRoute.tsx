import { JSX } from 'react';
import { useAuth } from '../../hooks/AuthProvider';
import { Navigate } from 'react-router';

const AdminRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const roles = JSON.parse(localStorage.getItem('roles') || '[]');

  if (isLoading) return <div>Loading...</div>;

  if (!isAuthenticated) return <Navigate to="/login" />;

  if (!roles.includes('Admin')) return <Navigate to="/dashboard" />;

  return children;
};

export default AdminRoute;
