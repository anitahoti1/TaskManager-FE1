import { ChangeEvent, FormEvent, useState } from "react"
import Logo from './../../assets/logo.png'
import { Input } from '../CustomInput/CustomInput';
import './Login.css'
import DefaultInput from "../../DefaultInput/DefaultInput";
import { useNavigate } from "react-router";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Login = () => {
    const [email, setEmail] = useState<string>('');
    const [hasError, setHasError] = useState<boolean>(false);
    const [hasPasswordError, setHasPasswordError] = useState<boolean>(false);
    const [password, setPassword] = useState<string>('');
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

    const navigate = useNavigate();


    const validateEmail = (email: string): boolean => {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    const validatePassword = (password: string): boolean => {
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/;
        return re.test(password);
    };

    function handleChange(event: ChangeEvent<HTMLInputElement>): void {
        const value = event.target.value;
        setEmail(value);
        setHasError(!validateEmail(value));
    }

    function handlePasswordChange(event: ChangeEvent<HTMLInputElement>): void {
        const value = event.target.value;
        setPassword(value);
        setHasPasswordError(!validatePassword(value));
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        setHasError(!validateEmail(email));
        setHasPasswordError(!validatePassword(password));
    }

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };


    return (
        <div className='signup-form'>
            <div className="signup-left-container">
                <div className="form-content">
                    <form className="signup-form-content" onSubmit={handleSubmit}>
                        <h1 className="title">Login</h1>
                        <DefaultInput onChange={handleChange} type="email" value={email} placeholder={"Enter Email"} error={hasError ? "Email is not valid" : undefined} />
                        <div style={{
                            position: 'relative',
                            maxWidth: '75%'
                        }}>

                            <DefaultInput onChange={handlePasswordChange} style={{
                                maxWidth: '100%'
                            }} type={isPasswordVisible ? "text" : "password"} value={password} placeholder={"Enter Password"} />
                            <div
                                className="password-toggle-button"
                                onClick={togglePasswordVisibility}
                            >
                                {isPasswordVisible ? <VisibilityOff /> : <Visibility />}
                            </div>
                        </div>
                        <button type="submit" className='submit-btn'>Login</button>
                        <p className="signup-text">Don't have an account? <a href="#" onClick={(e: any) => {
                            e.preventDefault();
                            navigate('/signup')
                        }}>Sign Up now</a></p>
                    </form>
                </div>

            </div >
            <div className="signup-right-container">
                <img src={Logo} alt="Logo" className="logo-img" />
            </div>
        </div >
    );
}

export default Login