import React from "react";
import s from "../Dialogs.module.css";
import userImg from '../../../img/user.jpg';

const Message = (props) => {
  return (
    <div className={s.message}>
      <img
        src={userImg}
        alt=""
      />
      {props.message}
    </div>
  );
};

export default Message;
