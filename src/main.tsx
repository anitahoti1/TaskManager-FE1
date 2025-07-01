import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import AuthProvider from './hooks/AuthProvider.tsx'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Modal from 'react-modal'; 

Modal.setAppElement('#root');


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AuthProvider>
            <App />
        </AuthProvider>
    </StrictMode>
    
)
