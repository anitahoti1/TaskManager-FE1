import { Visibility, VisibilityOff } from "@mui/icons-material"
import React, { ChangeEvent, useState } from "react";


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


