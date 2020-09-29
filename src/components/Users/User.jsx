import React from "react";
import s from "./Users.module.css";
import userPhoto from "../../img/user.jpg";
import { NavLink } from "react-router-dom";

const User = ({ user, followingInProgress, unfollow, follow }) => {
  return (
    <div className={s.item}>
      <div className={s.avatarAndButton}>
        <div>
          <NavLink to={"/profile/" + user.id}>
            <img
              src={user.photos.small != null ? user.photos.small : userPhoto}
              className={s.userPhoto}
              alt="userPhoto"
            />
          </NavLink>
        </div>
        <div>
          {user.followed ? (
            <button
              disabled={followingInProgress.some((id) => id === user.id)}
              className={s.buttonsToggle}
              onClick={() => {
                unfollow(user.id);
              }}
            >
              Unfollow
            </button>
          ) : (
            <button
              disabled={followingInProgress.some((id) => id === user.id)}
              className={s.buttonsToggle}
              onClick={() => {
                follow(user.id);
              }}
            >
              Follow
            </button>
          )}
        </div>
      </div>
      <div className={s.description}>
        <div className={s.nameAndStatus}>
          <div className={s.name}>{user.name}</div>
          <div className={s.status}>{user.status}</div>
        </div>
        <div className={s.location}>
          <div>{"City,"}</div>
          <div>{"Country"}</div>
        </div>
      </div>
    </div>
  );
};

export default User;
