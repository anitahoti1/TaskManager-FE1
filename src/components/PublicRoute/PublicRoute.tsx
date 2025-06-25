import { useAuth } from '../../hooks/AuthProvider'
import { Navigate } from 'react-router'

const PublicRoute = ({children}: any) => {
const { isAuthenticated,isLoading} = useAuth();

if(isLoading) return <div>Loading ... </div>
  return (
    <>
    {!isAuthenticated ? children : <Navigate to={'/dashboard'}/>}
    </>
  )
}

export default PublicRoute