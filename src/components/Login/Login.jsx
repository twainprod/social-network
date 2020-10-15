import React from "react";
import s from "./Login.module.css";
import { connect } from "react-redux";
import { login } from "../../redux/auth-reducer";
import { Redirect } from "react-router-dom";
import LoginForm from "./LoginForm";

// Разметка страницы LOGIN
const Login = (props) => {
  const onSubmit = (formData) => {
    props.login(
      formData.email,
      formData.password,
      formData.rememberMe,
      formData.captcha
    );
  };
  if (props.isAuth) {
    return <Redirect to={"/profile"} />;
  }
  return (
    <div>
      <div className={s.title}>Sign into your account</div>
      <LoginForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  captchaUrl: state.auth.captchaUrl,
});

export default connect(mapStateToProps, { login })(Login);
