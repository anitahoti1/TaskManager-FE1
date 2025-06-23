import React from 'react';
import './index.css'

interface IDefaultInput {
  type: React.HTMLInputTypeAttribute;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  name?: string;
  label?: string;
  error?: string;
  required?: boolean;
  className?: string;
  style?: React.CSSProperties;
  autoComplete?: boolean;
}

const DefaultInput: React.FC<IDefaultInput> = ({
  type,
  value,
  onChange,
  placeholder,
  name,
  label,
  error,
  className,
  required,
  style,
  autoComplete,
}) => {
  return (
    <div className='default-input' >
      {label && <label htmlFor={name}>{label}</label>}
      <input
       required={required}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        name={name}
        className={className}
        style={style}
        autoComplete={autoComplete ? 'on' : 'off'}
      />
      {error && (
        <span className="error-text-default-input">
          {error}
        </span>
      )}
    </div>
  );
};

export default DefaultInput;