import { Visibility, VisibilityOff } from "@mui/icons-material"
import React, { ChangeEvent, useState } from "react";

// interface IProps {
//     type?: React.HTMLInputTypeAttribute
//     value?: string;
//     label?: {
//         htmlFor: string;
//         name: string;
//     }
//     errors?: {
//         message: string,
//         visible: boolean
//     },
//     password?: {
//         className: string,
//         visible: boolean,
//         onClick: () => void,
//     }
//     handleChange?: (event: ChangeEvent<HTMLInputElement>) => void;
// }


interface Iprops {
    type?: React.HTMLInputTypeAttribute,
    value?: string;
    handleChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    label?: {
        htmlFor: string;
        name: string;
    }
    errors?: {
        message: string,
        visible: boolean
    },
    placeholder?: string
    className?: string
}


export const Input: React.FC<Iprops> = ({ value, className, type, label, errors, placeholder, handleChange }) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

    const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);

    if (type === "password")
        return (
            <div className="input-wrapper" >
                <label htmlFor={label?.htmlFor}>{label?.name}</label>
                <div className="password-input-container">
                    <input
                        type={isPasswordVisible ? "text" : "password"}
                        id={label?.htmlFor}
                        name={label?.htmlFor}
                        className={`form-control ${className}`}
                        onChange={handleChange}
                        value={value}
                        placeholder={placeholder || ""}
                    />
                    <div
                        className="password-toggle-button"
                        onClick={togglePasswordVisibility}
                    >
                        {isPasswordVisible ? <VisibilityOff /> : <Visibility />}
                    </div>
                </div>
                <span style={{ color: 'red', fontSize: '.9rem', display: errors?.visible ? 'block' : 'none' }}>
                    {errors?.message}
                </span>
            </div>
        )

    return (
        <div className="input-wrapper">
            <label htmlFor={label?.htmlFor}>{label?.name}</label>
            <input
                type={type}
                id={label?.htmlFor}
                name={label?.htmlFor}
                className={`form-control ${className}`}
                onChange={handleChange}
                value={value}
                placeholder={placeholder || ""}
            />
            <span style={{ color: 'red', fontSize: '.9rem', display: errors?.visible ? 'block' : 'none' }}>
                {errors?.message}
            </span>
        </div>
    )
}


// const CustomInput: React.FC<IProps> = ({ value, type, label, errors, password, handleChange }) => {

//     if (type === "password") {
//         return (
//             <div className="password-toggle-button" style={{ position: 'relative' }} >
//                 {password && <label htmlFor={"password"}>{Password.name}</label>}
//                 <input
//                     type={type}
//                     name="password"
//                     id="password"
//                     onChange={handleChange}
//                     value={value}
//                     placeholder="Enter Password"
//                     className="form-control inp_text"
//                 />
//                 <span style={{ color: 'red', position: 'absolute', bottom: '3px', display: hasError ? 'block' : 'none' }}>
//                     Email is not valid
//                 </span>
//             </div>
//         )
//     }
//     return (
//         <div className='input-wrapper' style={{ position: 'relative' }}>
//             {label && <label htmlFor={label.htmlFor}>{label.name}</label>}
//             <input
//                 type={type}
//                 name="email"
//                 id="email"
//                 onChange={handleChange}
//                 value={value}
//                 placeholder="Enter email"
//                 className="form-control inp_text"
//             />
//             <div />
//             {errors && <span style={{ color: 'red', position: 'absolute', bottom: '3px', display: errors.visible ? 'block' : 'none' }}>
//                 {errors.message}
//             </span>}
//         </div>

//     )
// }

// export default CustomInput;