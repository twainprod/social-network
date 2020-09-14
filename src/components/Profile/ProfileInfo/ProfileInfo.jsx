import React from "react";
import s from "./ProfileInfo.module.css";
import userPhoto from "../../../img/user.jpg";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

const ProfileInfo = ({ profile, status, updateStatus, isOwner, savePhoto }) => {
  const onMainPhotoSelected = (e) => {
    if (e.target.files.length) {
      savePhoto(e.target.files[0]);
    }
  };
  return (
    <div>
      <div className={s.description}>
        <img src={profile.photos.large || userPhoto} alt="" />
        <div className={s.info}>
          <h3>{profile.fullName}</h3>
          <div>
            Date of Birth: 20th of April
            <br /> Education: {profile.contacts.vk}
            <ProfileStatusWithHooks
              status={status}
              updateStatus={updateStatus}
            />
          </div>
        </div>
      </div>
      <div>
        {isOwner && <input type={"file"} onChange={onMainPhotoSelected} />}
      </div>
    </div>
  );
};
export default ProfileInfo;
