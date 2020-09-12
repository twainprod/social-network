import React from "react";
import s from "./ProfileInfo.module.css";
import userPhoto from "../../../img/user.jpg";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

const ProfileInfo = ({ profile, status, updateStatus }) => {
  return (
    <div>
      <div className={s.description}>
        <img
          src={profile.photos.large != null ? profile.photos.large : userPhoto}
          alt=""
        />
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
    </div>
  );
};
export default ProfileInfo;
