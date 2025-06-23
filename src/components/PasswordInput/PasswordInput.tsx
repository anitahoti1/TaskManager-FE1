import { Line } from 'rc-progress';
import './PasswordInput.css';

interface IPasswordInput {
    password : string;
    handleChange(e:any): void;
    passwordStrength: number;
    color:string;
    autoComplete?:boolean;
}


const PasswordInput = ({password,handleChange,passwordStrength,color}:IPasswordInput) => {

 
    return (
    <div className="progress-bar">

    <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) =>handleChange(e)}
    />
 {password.length > 0 &&   
 <div className='error-lines'>
<span style={{ color: password.length >= 6 ? "green" : 'red'}}>{password.length >= 6 && (password) ? "✔" : ' ✖'} Password must be at least 6 characters </span>Add commentMore actions
  <span style={{ color: /[a-z]/.test(password) ? "green" : 'red'}}>{/[a-z]/.test(password) ? "✔" : ' ✖'} Password must have at least 1 lowercase letter </span>
  <span style={{ color: /[A-Z]/.test(password) ? "green" : 'red'}}>{/[A-Z]/.test(password) ? "✔" : ' ✖'} Password must have at least 1 uppercase letter </span>
  <span style={{ color: /\d/.test(password) ? "green" : 'red'}}>{/\d/.test(password) ? "✔" : ' ✖'} Password must have at least 1 number </span>
  <span style={{ color: /[@$!%*?&]/.test(password) ? "green" : 'red'}}>{/[@$!%*?&]/.test(password) ? "✔" : ' ✖'} Password must have at least 1 special character </span>
  </div>}
   

    <div  className='password-error' >
      <Line 
        percent={passwordStrength} 
        strokeWidth={4} 
        trailWidth={4}
        strokeColor={color}
      />
    </div>
  </div>
  )
}

export default PasswordInput