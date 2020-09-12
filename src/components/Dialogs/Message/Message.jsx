import React from "react";
import s from "../Dialogs.module.css";

const Message = (props) => {
  return (
    <div className={s.message}>
      <img
        src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
        alt=""
      />
      {props.message}
    </div>
  );
};

export default Message;
