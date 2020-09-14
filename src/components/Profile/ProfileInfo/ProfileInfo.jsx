import React, { useState } from "react";
import s from "./ProfileInfo.module.css";
import userPhoto from "../../../img/user.jpg";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import ProfileDataForm from "./ProfileDataForm";

const ProfileInfo = ({
  profile,
  status,
  updateStatus,
  isOwner,
  savePhoto,
  saveProfile,
}) => {
  let [editMode, setEditMode] = useState(false);

  const onMainPhotoSelected = (e) => {
    if (e.target.files.length) {
      savePhoto(e.target.files[0]);
    }
  };

  const onSubmit = (formData) => {
    saveProfile(formData).then(() => {
      setEditMode(false);
    });
  };

  return (
    <div>
      <div className={s.description}>
        <img
          src={profile.photos.large || userPhoto}
          alt=""
          className={s.avatar}
        />
        <div className={s.info}>
          {editMode ? (
            <ProfileDataForm
              initialValues={profile}
              profile={profile}
              onSubmit={onSubmit}
            />
          ) : (
            <ProfileData
              profile={profile}
              isOwner={isOwner}
              goToEditeMode={() => {
                setEditMode(true);
              }}
            />
          )}
          <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
        </div>
      </div>
      <div>
        {isOwner && <input type={"file"} onChange={onMainPhotoSelected} />}
      </div>
    </div>
  );
};

const ProfileData = ({ profile, isOwner, goToEditeMode }) => {
  return (
    <div>
      {isOwner && <button onClick={goToEditeMode}>Edit</button>}
      <div>
        <h3>{profile.fullName}</h3>
        <b>Looking for a job: </b>
        {profile.lookingForAJob ? "yes" : "no"}
        {profile.lookingForAJob && (
          <div>
            <b>My professional skills:</b> {profile.lookingForAJobDescription}
          </div>
        )}
      </div>
      <div>
        <b>About me:</b> {profile.aboutMe}
      </div>
      <div>
        <b>Contacts:</b>{" "}
        <div className={s.contacts}>
          {Object.keys(profile.contacts).map((key) => {
            return (
              <Contact
                key={key}
                contactTitle={key}
                contactValue={profile.contacts[key]}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

const Contact = ({ contactTitle, contactValue }) => {
  return (
    <div>
      <b>{contactTitle}</b>: {contactValue}
    </div>
  );
};

export default ProfileInfo;
