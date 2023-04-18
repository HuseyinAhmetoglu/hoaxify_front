import React from "react";

function ButtonWithProgress({ onClick, disabled, pendingApiCall, text }) {
  return (
    <div className="text-center">
      <button className="btn btn-primary" onClick={onClick} disabled={disabled}>
        {pendingApiCall && (
          <span className="spinner-border spinner-border-sm"></span>
        )}{" "}
        {text}
      </button>
    </div>
  );
}

export default ButtonWithProgress;
