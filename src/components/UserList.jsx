import React from "react";
import { useState } from "react";
import { getUsers } from "../api/apiCalls";
import { useEffect } from "react";

function UserList() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUsers().then((response) => {
      setUsers(response.data);
    });
  }, []);
  return (
    <div className="card">
      <h3 className="card-header text-center">Users</h3>
      <div className="list-group">
        {users.map((user) => (
          <div
            className="list-group-item list-group-item-action"
            key={user.displayName}
          >
            {user.username}
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserList;
