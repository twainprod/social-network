import React from "react";
import { Field, reduxForm } from "redux-form";
import sf from "../common/FormsControls/FormsControls.module.css";
import s from "./Login.module.css";
import { Input } from "../common/FormsControls/FormsControls";
import { required } from "../../utils/validators/validators";
import warning from "../../img/warning.png";

// Разметка формы
const LoginForm = ({ handleSubmit, error, captchaUrl }) => {
  return (
    <form onSubmit={handleSubmit}>
      <Field
        placeholder={"Email"}
        className={s.inputArea}
        name={"email"}
        component={Input}
        validate={[required]}
      />
      <Field
        placeholder={"Password"}
        className={s.inputArea}
        name={"password"}
        component={Input}
        validate={[required]}
        type={"password"}
      />
      <div className={s.rememberMe}>
        <Field type={"checkbox"} name={"rememberMe"} component={"input"} />
        {""}
        Remember me
      </div>
      {captchaUrl && <img src={captchaUrl} alt="captcha" />}
      {captchaUrl && (
        <Field
          component={Input}
          name={"captcha"}
          validate={[required]}
          className={s.captcha}
        />
      )}
      {error && (
        <div className={sf.formError}>
          <img src={warning} alt="warning" />
          {error}
        </div>
      )}
      <div>
        <button className={s.btnSubmit}>Login</button>
      </div>
    </form>
  );
};

// Создаем контейнерную компоненту, подключая reduxForm для LoginForm
export default reduxForm({
  form: "login",
})(LoginForm);
