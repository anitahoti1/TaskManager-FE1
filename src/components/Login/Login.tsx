import { ChangeEvent, CSSProperties, FormEvent, useState } from "react";
import Logo from './../../assets/logo.png';
import './Login.css';
import DefaultInput from "../../DefaultInput/DefaultInput";
import { useNavigate } from "react-router";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import { useAuth } from "../../hooks/AuthProvider";

const Login = () => {
    const [email, setEmail] = useState<string>('');
    const [hasError, setHasError] = useState<boolean>(false);
    const [hasLoading, setLoading] = useState<boolean>(false);
    const [, setHasPasswordError] = useState<boolean>(false);
    const [password, setPassword] = useState<string>('');
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

    const override: CSSProperties = {
        display: "block",
        margin: "0 auto",
        borderColor: "red",
    };

    const navigate = useNavigate();
    const { setUser, setIsAuthenticated } = useAuth();

    const validateEmail = (email: string): boolean => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    const validatePassword = (password: string): boolean => {
        const re = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/;
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

    async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();

        const isEmailValid = validateEmail(email);
        const isPasswordValid = validatePassword(password);

        setHasError(!isEmailValid);
        setHasPasswordError(!isPasswordValid);

        if (!isEmailValid || !isPasswordValid) {
            toast.error("Username or password is not correct!");
            return;
        }

        setLoading(true);

        try {
            const res = await axios.post('https://localhost:7095/api/Auth/login', {
                userName: email,
                password: password
            });

            const response = res.data;

            if (!response || !response.status || !response.data?.data?.token) {
                toast.error("Login failed or token missing.");
                setLoading(false);
                return;
            }

                const userData = response.data.data;

                if (!userData.roles?.includes("Admin")) {
                toast.error("Only Admin users can log in.");
                setLoading(false);
                return;
                }

            localStorage.setItem("token", userData.token);
            localStorage.setItem("user", JSON.stringify(userData));
            localStorage.setItem("roles", JSON.stringify(userData.roles || []));

            setIsAuthenticated(true);
            setUser(userData);
            navigate('/dashboard');
        } catch (error: any) {
            toast.error("Login failed");
            console.error("Login error:", error);
        } finally {
            setLoading(false);
        }
    }

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <>
            {hasLoading && (
                <div className="loading-overlay">
                    <ClipLoader
                        color="#36d7b7"
                        loading={hasLoading}
                        cssOverride={override}
                        size={50}
                        aria-label="Loading Spinner"
                    />
                </div>
            )}

            <div className='signup-form'>
                <div className="signup-left-container">
                    <div className="form-content">
                        <form className="signup-form-content" onSubmit={handleSubmit}>
                            <h1 className="title">Login</h1>
                            <DefaultInput
                                onChange={handleChange}
                                type="email"
                                value={email}
                                placeholder={"Enter Email"}
                                error={hasError ? "Email is not valid" : undefined}
                            />
                            <div style={{ position: 'relative', maxWidth: '75%' }}>
                                <DefaultInput
                                    onChange={handlePasswordChange}
                                    style={{ maxWidth: '100%' }}
                                    type={isPasswordVisible ? "text" : "password"}
                                    value={password}
                                    placeholder={"Enter Password"}
                                />
                                <div className="password-toggle-button" onClick={togglePasswordVisibility}>
                                    {isPasswordVisible ? <VisibilityOff /> : <Visibility />}
                                </div>
                            </div>
                            <button type="submit" className='submit-btn'>Login</button>
                            <p className="signup-text">Don't have an account? <a href="#" onClick={(e) => {
                                e.preventDefault();
                                navigate('/signup');
                            }}>Sign Up now</a></p>
                        </form>
                    </div>
                </div>

                <div className="signup-right-container">
                    <img src={Logo} alt="Logo" className="logo-img" />
                </div>
            </div>
        </>
    );
}

export default Login;
