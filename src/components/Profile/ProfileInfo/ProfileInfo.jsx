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
        <div className={s.blockAvatar}>
          <div>
            {isOwner && (
              <>
                <label htmlFor={s.uploadPhoto}>
                  <img
                    src="https://image.flaticon.com/icons/png/512/12/12313.png"
                    alt="upload"
                    className={s.loadPhoto}
                  />
                </label>
                <input
                  id={s.uploadPhoto}
                  type={"file"}
                  onChange={onMainPhotoSelected}
                />{" "}
              </>
            )}
          </div>
          <img
            src={profile.photos.large || userPhoto}
            alt=""
            className={s.avatar}
          />
        </div>
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
    </div>
  );
};

const ProfileData = ({ profile, isOwner, goToEditeMode }) => {
  return (
    <div>
      {isOwner && (
        <img
          src="https://icons-for-free.com/iconfiles/png/512/compose+draw+edit+write+icon-1320196706045580276.png"
          className={s.buttonEdit}
          onClick={goToEditeMode}
          alt="edit"
        />
      )}
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
