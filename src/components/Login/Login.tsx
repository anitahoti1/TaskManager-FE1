import './Login.css'
//import { Button } from "@mui/material"
import { ChangeEvent, FormEvent, useState } from "react"
import Logo from './../../assets/logo.png'
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Input } from '../CustomInput/CustomInput';

const Login = () => {
    const [email, setEmail] = useState<string>('');
    const [hasError, setHasError] = useState<boolean>(false);
    const [hasPasswordError, setHasPasswordError] = useState<boolean>(false);
    const [password, setPassword] = useState<string>('');
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

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
        <div className="login">
            <div className="form-container">
                <form noValidate onSubmit={handleSubmit}>
                    <h1 className='form-title'>Login</h1>
                    <Input
                        label={{
                            htmlFor: "email",
                            name: "Email"
                        }}
                        placeholder='Enter Email'
                        handleChange={handleChange}
                        errors={{
                            visible: hasError,
                            message: "Email is not valid"
                        }}
                    />
                    <Input
                        type='password'
                        label={{
                            htmlFor: "password",
                            name: "Password"
                        }}
                        placeholder='Enter Password'
                        handleChange={handlePasswordChange}
                        errors={{
                            visible: hasPasswordError,
                            message: "Email or Password is not valid"
                        }}
                    />
                    {/* <div className='input-wrapper'>
                        <label htmlFor="password">Password</label>
                        <div className="password-input-container">
                            <input
                                type={isPasswordVisible ? 'text' : 'password'}
                                name="password"
                                id="password"
                                onChange={handlePasswordChange}
                                value={password}
                                placeholder="Enter Password"
                                className="form-control password-input"
                                autoComplete='off'
                                data-lpignore="true"
                            />

                            <div
                                className="password-toggle-button"
                                onClick={togglePasswordVisibility}
                            >
                                {isPasswordVisible ? <VisibilityOff /> : <Visibility />}
                            </div>

                            {/* <span style={{ color: 'red', position: 'absolute', bottom: '-8px', display: hasPasswordError ? 'block' : 'none' }}>
                                Password is not valid
                            </span> */}
                    {/* </div> */}
                    {/* </div>  */}

                    <div className='button-wrapper'>
                        <button className='submit-button'>Login</button>
                        <p className="signup-text">Don't have an account? <a href="#">Sign Up now</a></p>
                    </div>
                </form>
            </div>

            <div className='logo-section'>
                <img src={Logo} alt="logo" />
            </div>
        </div>
    )
}

export default Login