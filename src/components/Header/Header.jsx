import React from "react";
import s from "./Header.module.css";
import { NavLink } from "react-router-dom";
import logoutImg from "./../../img/logout.svg";
import loginImg from "./../../img/login.svg";

const Header = (props) => {
  return (
    <header className={s.header}>
      <div className={s.brand}>TWAINPROD.COM - First React App</div>
      <div className={s.authBlock}>
        {props.isAuth ? (
          <div className={s.loggedUser}>
            {props.login}{" "}
            <img src={logoutImg} onClick={props.logout} alt="logout" />
          </div>
        ) : (
          <NavLink to={"/login"}>
            Login
            <img src={loginImg} alt="login" />
          </NavLink>
        )}
      </div>
    </header>
  );
};
export default Header;
