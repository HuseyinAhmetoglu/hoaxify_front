import React from "react";

const Input = ({ name, label, error, onChange, type, defaultValue }) => {
  const className = error ? "form-control is-invalid" : "form-control";
  return (
    <div className="form-group m-3">
      <label>{label}</label>
      <input
        className={className}
        name={name}
        onChange={onChange}
        type={type}
        defaultValue={defaultValue}
      />
      <div className="invalid-feedback">{error}</div>
    </div>
  );
};

export default Input;
