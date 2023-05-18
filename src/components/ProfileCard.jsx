import React from "react";
import { useParams } from "react-router";
import { connect } from "react-redux";

function ProfileCard({ username }) {
  const params = useParams();
  let message = "We cannot edit";
  if (username === params.username) {
    message = "We can edit";
  }
  return <div>{message}</div>;
}

const mapStateToProps = (store) => {
  return {
    username: store.username,
  };
};

export default connect(mapStateToProps)(ProfileCard);
