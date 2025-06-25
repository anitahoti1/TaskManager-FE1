import './App.css'
import { RouterProvider } from 'react-router'
import routes from './routes/routes'
import { ToastContainer } from 'react-toastify'
import AuthProvider from './hooks/AuthProvider'

function App() {
  
  
  return (
    <>
      <AuthProvider>
        <RouterProvider router={routes} />
        <ToastContainer />
      </AuthProvider>
    </>
  )
}

export default App