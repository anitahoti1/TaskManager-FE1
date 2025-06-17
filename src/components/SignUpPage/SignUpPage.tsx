import React, { useEffect, useState } from 'react';
import './SignUpPage.css';
import logo from '../../logo/logo.png';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PasswordInput from '../PasswordInput/PasswordInput';
import DefaultInput from '../../DefaultInput/DefaultInput';

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
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    if (user.firstName.length < 3 || user.firstName.length > 20) {
      errors.firstName = 'First name must be 3-20 characters';
      hasError = true;
    }

      if (user.lastName.length < 3 || user.lastName.length > 20) {
      errors.lastName = 'Last name must be 3-20 characters';
      hasError = true;
    }

     if (!emailRegex.test(user.email)) {
      errors.email = 'Email is invalid';
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
    if (!isValid) return;

    setFormErrors({
      firstName: '',
      lastName: '', 
      email: '', 
      password: '', 
      confirmPassword: '', 
      birthday: ''
    });
  };


const handleChange = (field: keyof IUser, value: string | Date  | null ) => {
    setUser((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className='signup-form'>
      <div className="signup-left-container">
        <div  className="form-content">
        <form className="signup-form-content" onSubmit={handleSubmit}>
          <h2>Sign Up</h2>
          <p>Fill the form below to create your account</p>

           <DefaultInput 
             type="text"
             value={user.firstName}
             onChange={(e) => handleChange('firstName' , e.target.value)}
             placeholder="First name"
           />

          <DefaultInput 
             type="text"
             value={user.lastName}
             onChange={(e) => handleChange('lastName' , e.target.value)}
             placeholder="Last Name"
           />

          <DefaultInput 
             type="email"
             value={user.email}
             onChange={(e) => handleChange('email' , e.target.value)}
             placeholder="Email"
             error={formErrors.email}
           />

          <PasswordInput  password={user.password}
           handleChange={(e) => handleChange('password', e.target.value)}
           passwordStrength={passwordStrength}
           color={color}
           />
         
         <DefaultInput 
             type="text"
             value={user.confirmPassword}
             onChange={(e) => handleChange('confirmPassword', e.target.value)}
             placeholder="Confirm Password"
             error={formErrors.confirmPassword}
           />
    
          <DatePicker
            selected={user.birthday}
            onChange={(date) => handleChange('birthday', date)}
            placeholderText="Enter your birthday"
            dateFormat="dd/MM/yyyy"
            className="date-picker-input"
            maxDate={new Date(new Date().setFullYear(new Date().getFullYear()-18))}
            showYearDropdown
            showMonthDropdown
            dropdownMode='select'
          />
           <span className="error-text">{formErrors.birthday}</span>

          <button type="submit" className="submit-btn">Sign Up</button>
          <p>Already have an account? <a href="/signin">Sign in</a></p>
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
