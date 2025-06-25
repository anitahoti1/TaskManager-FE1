import './ProtectedRoute.css'
import { useAuth } from '../../hooks/AuthProvider'
import { Navigate } from 'react-router'
import Modal from 'react-modal'
import { useState } from 'react';

import LogoutIcon from '@mui/icons-material/Logout';
const ProtectedRoute = ({ children }: any) => {
    const { isAuthenticated, isLoading } = useAuth();
    const [isOpened, setIsOpened] = useState(false);
    const toggleModal = () => setIsOpened((prev) => !prev);
    const {setIsAuthenticated,setUser}=useAuth();
    const onLogout = () =>{
        setIsAuthenticated(false);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(undefined);
    }

    if (isLoading) return <div>Loading ... </div>
    return (
        <>
        <div className='header'>
            <button title='Logout' className='logut-btn' onClick={toggleModal}>
                <LogoutIcon/>
            </button>
          </div>  
       <div className='modal-content'>   
          <Modal
            // style={{content:{display:'flex', flexDirection:'column', alignItems:'center',width:'250px',height:'162px',padding:'15px',boxShadow:'0 2px 2px'}}}
            style={{content:{position:'fixed', top:'50%', left:'50%',transform: 'translate(-50%,-50%)',padding:'100px' , width:'170px', height:'100px',minHeight:120}}}
                shouldCloseOnEsc
                shouldCloseOnOverlayClick
                onRequestClose={toggleModal}
                isOpen={isOpened}
                contentLabel='Logout?'
            >
                <h3 className='modal-title'>Do you want to logout?</h3>
                <div className="modal-buttons">
                    <button onClick={toggleModal}>
                        Cancel
                    </button>
                    <button  onClick={onLogout} >
                        Logout
                    </button>
                </div>
            </Modal>
         </div>  
            {isAuthenticated ? children : <Navigate to={'/login'} />}
        </>
    )
}

export default ProtectedRoute