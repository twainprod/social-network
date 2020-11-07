import React from "react";
import s from "../Dialogs.module.css";
import { NavLink } from "react-router-dom";
import userImg from '../../../img/user.jpg';

const DialogItem = (props) => {
  return (
    <div className={s.dialog}>
      <NavLink to={"/dialogs/" + props.id} onClick={() => props.idToMessages(props.id)} activeClassName={s.active}>
        <div className={s.dialogAvatar}>
          <img
            src={userImg}
            alt=""
          />
          {props.name}
        </div>
      </NavLink>
    </div>
  );
};
export default DialogItem;
