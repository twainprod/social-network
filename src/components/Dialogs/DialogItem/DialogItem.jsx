import React from "react";
import s from "../Dialogs.module.css";
import { NavLink } from "react-router-dom";

const DialogItem = (props) => {
  return (
    <div className={s.dialog + " " + s.active}>
      <NavLink to={"/dialogs/" + props.id} activeClassName={s.active}>
        <div className={s.dialogAvatar}>
          <img
            src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
            alt=""
          />
          {props.name}
        </div>
      </NavLink>
    </div>
  );
};
export default DialogItem;
