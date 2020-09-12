import React from "react";
import s from "./FormsControls.module.css";
import warning from "./../../../img/warning.png";

export const Textarea = ({ input, meta: { touched, error }, ...props }) => {
  const hasError = touched && error;
  return (
    <div className={s.formControl + " " + (hasError ? s.error : "")}>
      <textarea {...input} {...props} />
      {hasError && (
        <span>
          <img src={warning} alt="warning" />
          {error}
        </span>
      )}
    </div>
  );
};

export const Input = ({ input, meta: { touched, error }, ...props }) => {
  const hasError = touched && error;
  return (
    <div className={s.formControl + " " + (hasError ? s.error : "")}>
      <input {...input} {...props} />
      <div className={s.spanBlock}>
        {hasError && (
          <span>
            <img src={warning} alt="warning" />
            {error}
          </span>
        )}
      </div>
    </div>
  );
};
