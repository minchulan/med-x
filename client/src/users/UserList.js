import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/user";

const UserList = ({ loading }) => {
  const navigate = useNavigate();
  const { users, loggedIn } = useContext(UserContext);

  console.log(users);

  useEffect(() => {
    if (!loading && !loggedIn) {
      navigate("/login");
    }
  }, [loading, loggedIn, navigate]);

  const userLinks = users && users.map((user) => (
    <li key={user.id}>
      <Link to={`/users/${user.id}/posts`}>{user.username}</Link>
    </li>
  ));

  return (
    <div>
      <h1>User List</h1>
      <ul>{userLinks}</ul>
    </div>
  );
};

export default UserList;
