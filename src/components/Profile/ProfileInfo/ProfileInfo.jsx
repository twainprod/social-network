import React, { useState } from "react";
import s from "./ProfileInfo.module.css";
import userPhoto from "../../../img/user.jpg";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import ProfileDataForm from "./ProfileDataForm";
import uploadImage from '../../../img/upload.png'

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
          <img
            src={profile.photos.large || userPhoto}
            alt=""
            className={s.avatar}
          />
          <div>
            {isOwner && (
              <>
                <label htmlFor={s.uploadPhoto}>
                  <img
                    src={uploadImage}
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
                status={status}
                updateStatus={updateStatus}
                goToEditeMode={() => {
                  setEditMode(true);
              }}
            />
          )}
          {/* <ProfileStatusWithHooks status={status} updateStatus={updateStatus} isOwner={isOwner} /> */}
        </div>
      </div>
    </div>
  );
};

const ProfileData = ({ profile, isOwner, goToEditeMode, status, updateStatus }) => {
  return (
    <div className={s.profileData}>
      {isOwner && (
        <button className={s.buttonEdit} onClick={goToEditeMode}>
          Edit profile
        </button>
      )}
      <div>
        <h3>{profile.fullName}</h3>
        <ProfileStatusWithHooks status={status} updateStatus={updateStatus} isOwner={isOwner} />
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
    <div className={s.contactItem}>
      <b>{contactTitle}</b>:{" "}
      {!contactValue ? (
        <span>-</span>
      ) : (
        (
          <a href={contactValue} target="_blank noopener">
            {contactValue}
          </a>
        ) || <span>none</span>
      )}
    </div>
  );
};

export default ProfileInfo;
