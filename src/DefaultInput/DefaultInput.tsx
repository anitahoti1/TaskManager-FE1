import React from 'react';
import SignUpPage from '../components/SignUpPage/SignUpPage.css';

interface IDefaultInput {
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  name?: string;
  label?: string;
  error?: string;
  className?: string;
  style?: React.CSSProperties;
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
  style,
}) => {
  return (
    <div className='default-input' >
      {label && <label htmlFor={name}>{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        name={name}
        className={className}
        style={style}
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