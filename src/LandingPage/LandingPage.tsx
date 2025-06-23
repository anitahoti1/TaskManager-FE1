import { useNavigate } from 'react-router';
import logo from './../logo/logo.png';
import './LandingPage.css';


const LandingPage = () => {
    const navigate = useNavigate();
  return (
    <div className='landing-page'>
      <div className="landing-left-side">
        <div className="left-side-content">
        <div className="title">
            <h2>Task Manager</h2>
            
           
            <p>Organize, track, and prioritize tasks to stay focused and productive</p>
            </div>
            
            <div className="buttons">
            <button type="button" className="signup-btn" onClick={() => navigate('/signup')}>
              Sign Up
            </button>
            <button type="button" className="login-btn" onClick={() => navigate('/login')}>
            Log In
          </button>
          </div>
        </div>
      </div>

      <div className="landing-right-side">
        <div className="logo">
          <img src={logo} alt="Logo" className='logo-img' />
        </div>
      </div>
    </div>
  )
}

export default LandingPage