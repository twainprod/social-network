import React from "react";
import s from "./Header.module.css";
import { NavLink } from "react-router-dom";
import userPhoto from "../../img/user.jpg";

const Header = (props) => {
  return (
    <header className={s.header}>
      <div className={s.brand}>TWAINPROD.COM - First React App</div>
      <div className={s.authBlock}>
        {props.isAuth ? (
          <div className={s.loggedUser}>
            {props.login}{" "}
            <img src={userPhoto} alt="userPhoto" className={s.userPhoto} />
            <button onClick={props.logout}>Logout</button>
          </div>
        ) : (
          <button>
            <NavLink to={"/login"}>Login</NavLink>
          </button>
        )}
      </div>
    </header>
  );
};
export default Header;
