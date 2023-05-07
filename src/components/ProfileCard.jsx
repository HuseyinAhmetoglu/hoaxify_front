import React, { useContext } from "react";
import { Authentication } from "../shared/AuthenticationContext";
import { useParams } from "react-router";

function ProfileCard() {
  const { username } = useContext(Authentication);
  const params = useParams();
  let message = "We cannot edit";
  if (username == params.username) {
    message = "We can edit";
  }
  return <div>{message}</div>;
}

export default ProfileCard;
