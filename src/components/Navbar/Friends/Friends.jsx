import React from "react";
import s from "./Friends.module.css";
import Friend from "./FriendsItem/Friend";

const Friends = (props) => {
  let friendsElements = props.friends.map((f) => <Friend name={f.name} />);

  return (
    <div className={s.friendsBlock}>
      <h3>Friends</h3>
      <div className={s.friends}>{friendsElements}</div>
    </div>
  );
};

export default Friends;
