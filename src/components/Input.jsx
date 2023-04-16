import React from "react";

const Input = ({ label, error, onChange }) => {
  const className = error ? "form-control is-invalid" : "form-control";
  return (
    <div className="form-group m-3">
      <label>{label}</label>
      <input className={className} onChange={onChange}></input>
      <div className="invalid-feedback">{error}</div>
    </div>
  );
};

export default Input;
