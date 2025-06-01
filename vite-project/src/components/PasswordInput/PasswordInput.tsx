import { Line } from 'rc-progress';

interface IPasswordInput {
    password : string;
    handleChange(e:any): void;
    passwordStrength: number;
    color:string;
  
}


const PasswordInput = ({password,handleChange,passwordStrength,color}:IPasswordInput) => {

 
    return (
    <div className="progress-bar"style={{position: 'relative', marginBottom: "18px"}}>

    <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) =>handleChange(e)}
    />
 {password.length > 0 &&   <div style={{display:"flex",flexDirection:'column'}}>
  <span style={{fontSize:"13px", color: password.length >= 6 ? "green" : 'red'}}>{password.length >= 6 && (password) ? "✔" : ' ✖'} Password must be at least 6 characters </span>
  <span style={{fontSize:"13px", color: /[a-z]/.test(password) ? "green" : 'red'}}>{/[a-z]/.test(password) ? "✔" : ' ✖'} Password must have at least 1 lowercase letter </span>
  <span style={{fontSize:"13px", color: /[A-Z]/.test(password) ? "green" : 'red'}}>{/[A-Z]/.test(password) ? "✔" : ' ✖'} Password must have at least 1 uppercase letter </span>
  <span style={{fontSize:"13px", color: /\d/.test(password) ? "green" : 'red'}}>{/\d/.test(password) ? "✔" : ' ✖'} Password must have at least 1 number </span>
  <span style={{fontSize:"13px", color: /[@$!%*?&]/.test(password) ? "green" : 'red'}}>{/[@$!%*?&]/.test(password) ? "✔" : ' ✖'} Password must have at least 1 special character </span>

  </div>}
   

    <div style={{ maxWidth:'43%' , maxHeight:'15px'}}>
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