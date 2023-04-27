import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

function ApiProgress(props) {
  const [pendingApiCall, setPendingApiCall] = useState(false);
  useEffect(() => {
    axios.interceptors.request.use((request) => {
      setPendingApiCall(true);
      return request;
    });
    axios.interceptors.response.use(
      (response) => {
        setPendingApiCall(false);
        return response;
      },
      (error) => {
        setPendingApiCall(false);
        throw error;
      }
    );
  });
  return <div>{React.cloneElement(props.children, { pendingApiCall })}</div>;
}

export default ApiProgress;
