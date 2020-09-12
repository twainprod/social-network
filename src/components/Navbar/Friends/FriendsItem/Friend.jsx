import React from "react";
import s from "../Friends.module.css";
import userPhoto from "./../../../../img/user.jpg";

const Friend = (props) => {
  return (
    <div className={s.friend}>
      <div className={s.photo}>
        <img src={userPhoto} alt="userPhoto" />
      </div>
      {props.name}
    </div>
  );
};

export default Friend;
