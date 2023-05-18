import React from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";

function ProfileCard() {
  const params = useParams();
  const { username: loggedInUsername } = useSelector((store) => {
    return {
      username: store.username,
    };
  });

  let message = "We cannot edit";
  if (loggedInUsername === params.username) {
    message = "We can edit";
  }
  return <div>{message}</div>;
}

export default ProfileCard;
