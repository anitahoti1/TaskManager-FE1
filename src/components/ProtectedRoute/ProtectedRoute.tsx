import './ProtectedRoute.css'
import { useAuth } from '../../hooks/AuthProvider'
import { Navigate, useNavigate } from 'react-router'
import Modal from 'react-modal'
import { useState } from 'react'
import LogoutIcon from '@mui/icons-material/Logout'

const ProtectedRoute = ({ children }: any) => {
    const { isAuthenticated, isLoading, setIsAuthenticated, setUser } = useAuth()
    const [isOpened, setIsOpened] = useState(false)
    const navigate = useNavigate()

    const toggleModal = () => setIsOpened((prev) => !prev)

    const onLogout = () => {
        setIsAuthenticated(false)
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setUser(undefined)
        navigate('/login')
    }

    if (isLoading) return <div>Loading...</div>

    return (
        <>
            <div className='header'>
                <button title='Logout' className='logout-btn' onClick={toggleModal}>
                    <LogoutIcon />
                </button>
            </div>

            <Modal
                className='modal-content'
                shouldCloseOnEsc
                shouldCloseOnOverlayClick
                onRequestClose={toggleModal}
                isOpen={isOpened}
                contentLabel='Logout?'
            >
                <h3 className='modal-title'>Do you want to logout?</h3>
                <div className="modal-buttons">
                    <button className="modal-cancel-btn" onClick={toggleModal}>Cancel</button>
                    <button className="modal-logout-btn" onClick={onLogout}>Logout</button>
                </div>


            </Modal>

            {isAuthenticated ? children : <Navigate to={'/login'} />}
        </>
    )
}

export default ProtectedRoute
