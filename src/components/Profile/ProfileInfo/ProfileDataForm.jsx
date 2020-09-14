import React from "react";
import { Field, reduxForm } from "redux-form";
import s from "./ProfileInfo.module.css";
import formStyle from "./../../common/FormsControls/FormsControls.module.css";
import warning from "./../../../img/warning.png";

const ProfileDataForm = ({ handleSubmit, profile, error }) => {
  return (
    <form onSubmit={handleSubmit}>
      <button>Save</button>
      {error && (
        <div className={formStyle.formError}>
          <img src={warning} alt="warning" className={s.warning} />
          {error}
        </div>
      )}
      <div>
        <b>Fullname:</b>
        <Field
          name={"fullName"}
          component={"input"}
          placeholder={"Write your name..."}
        />
      </div>
      <div>
        <b>Looking for a job: </b>{" "}
        <Field name={"lookingForAJob"} component={"input"} type={"checkbox"} />
      </div>
      <div>
        <b>My professional skills:</b>{" "}
        <Field
          name={"lookingForAJobDescription"}
          component={"textarea"}
          placeholder={"Write your professional skills..."}
        />
      </div>
      <div>
        <b>About me:</b>{" "}
        <Field
          name={"aboutMe"}
          component={"input"}
          placeholder={"Write some information..."}
        />
      </div>
      <div>
        <b>Contacts:</b>{" "}
        {Object.keys(profile.contacts).map((key) => {
          return (
            <div className={s.contacts} key={key}>
              <b>{key}:</b>{" "}
              <div>
                <Field
                  name={"contacts." + key}
                  component={"input"}
                  placeholder={key}
                />
              </div>
            </div>
          );
        })}
      </div>
    </form>
  );
};

const ProfileDataFormReduxForm = reduxForm({ form: "edit-profile" })(
  ProfileDataForm
);

export default ProfileDataFormReduxForm;
