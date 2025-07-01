import React, { useEffect, useState } from 'react';
import './SignUpPage.css';
import logo from '../../logo/logo.png';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PasswordInput from '../PasswordInput/PasswordInput';
import DefaultInput from '../../DefaultInput/DefaultInput';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

interface IUser {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  confirmPassword: string,
  birthday: Date | null
}

const SignUpPage = () => {
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [color, setColor] = useState('#ff4d4f');
  const [user, setUser] = useState<IUser>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthday: null
  });

  const navigate = useNavigate();

  useEffect(() => {
    const strength = (() => {
      let score = 0;
      const pw = user.password;
      if (pw.length >= 6) score += 20;
      if (/[A-Z]/.test(pw)) score += 20;
      if (/[a-z]/.test(pw)) score += 20;
      if (/\d/.test(pw)) score += 20;
      if (/[@$!%*?&]/.test(pw)) score += 20;
      return score;
    })();

    setPasswordStrength(strength);

    if (strength < 40) setColor("red");
    else if (strength < 80) setColor('orange');
    else setColor('green');
  }, [user.password]);
  const [backMessage, setBackMessage] = useState<string | undefined>(undefined);
  const [formErrors, setFormErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthday: ''
  });
  const validateInputs = (user: IUser): boolean => {

    let errors = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      birthday: ''
    };

    let hasError = false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/;









    if (!emailRegex.test(user.email)) {
      errors.email = 'Email is not valid';
      hasError = true;
    }

    if (!passwordRegex.test(user.password)) {
      errors.password = 'Password must be at least 6 characters.';
      hasError = true;
    }


    if (user.confirmPassword !== user.password) {
      errors.confirmPassword = 'Passwords do not match';
      hasError = true;
    }

    const getAge = (birthDate: Date): number => {
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    };

    setFormErrors(errors);

    return !hasError;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = validateInputs(user);


    if (!isValid) {
      return

    } else {
      setBackMessage(undefined);
    axios({
      method: 'post',
      url: 'https://localhost:7095/api/Auth/register',
      data: {
        userName: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        birthdate: user.birthday,
        password: user.password

        }
      }).then(function (response) {
        if (response.data.status === false) {
          toast.error('Unable to register. Email is already taken.',
            {
              position: 'top-right',
            });
          //setBackMessage(response.data.errors[0].message);

        } else {
          toast.success('Registration successful. You can now log in.', {
            position: 'top-right',
            onClose: () => navigate('/login'),
          })
        }

      });
      setFormErrors({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        birthday: ''
      });
    }
  };


  const handleChange = (field: keyof IUser, value: string | Date | null) => {
    setUser((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className='signup-form'>

      <div className="signup-left-container">
        <div className="form-content">
          <form className="signup-form-content" onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            <p>Fill the form below to create your account</p>

            <DefaultInput
              required={true}
              autoComplete={true}
              type="text"
              value={user.firstName}
              onChange={(e) => handleChange('firstName', e.target.value)}
              placeholder="First name"
            />

            <DefaultInput
              required={true}
              autoComplete={true}
              type="text"
              value={user.lastName}
              onChange={(e) => handleChange('lastName', e.target.value)}
              placeholder="Last Name"
            />

            <DefaultInput
              required={true}
              autoComplete={true}
              type="text"
              value={user.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="Email"
              error={backMessage ? backMessage : formErrors.email}
            />


            <PasswordInput password={user.password}
              handleChange={(e) => handleChange('password', e.target.value)}
              passwordStrength={passwordStrength}
              color={color}
              autoComplete={true}

            />

            <DefaultInput
              required={true}
              type="password"
              value={user.confirmPassword}
              onChange={(e) => handleChange('confirmPassword', e.target.value)}
              placeholder="Confirm Password"
              autoComplete={false}
              error={formErrors.confirmPassword}
            />

            <DatePicker
              selected={user.birthday}
              onChange={(date) => {
                handleChange('birthday', date)

              }}
              placeholderText="Enter your birthday"
              dateFormat="dd/MM/yyyy"
              className="date-picker-input"
              maxDate={new Date(new Date().setFullYear(new Date().getFullYear() - 18))}
              showYearDropdown
              showMonthDropdown
              dropdownMode='select'
            />
            <span className="error-text">{formErrors.birthday}</span>

            <ToastContainer />
            <button type="submit" className="btn btn-success w-75 mt-3">Sign Up</button>

            <p className="mt-3">Already have an account? <a href="/login" onClick={(e) => {
               e.preventDefault();
               navigate('/login')
            }}>Sign in</a></p>

          </form>
        </div>

      </div>
      <div className="signup-right-container">
        <img src={logo} alt="Logo" className="logo-img" />
      </div>
    </div>
  );
};

export default SignUpPage;