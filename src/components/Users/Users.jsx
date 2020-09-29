import React from "react";
import s from "./Users.module.css";
import User from "./User";

let Users = (props) => {
  return (
    <div className={s.users}>
      {props.users.map((u) => (
        <User
          key={u.id}
          user={u}
          followingInProgress={props.followingInProgress}
          unfollow={props.unfollow}
          follow={props.follow}
        />
      ))}
    </div>
  );
};

export default Users;
