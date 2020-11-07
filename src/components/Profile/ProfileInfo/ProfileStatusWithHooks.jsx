import React, { useEffect } from "react";
import { useState } from "react";
import s from "./ProfileInfo.module.css";
import cn from 'classnames';

const ProfileStatusWithHooks = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState(props.status);

  useEffect(() => {
    setStatus(props.status);
  }, [props.status]);

  const activateEditMode = () => {
    setEditMode(true);
  };

  const deactivateEditMode = () => {
    setEditMode(false);
    props.updateStatus(status);
  };

  const onStatusChange = (e) => {
    setStatus(e.currentTarget.value);
  };

  return (
    <div>
      {!editMode && (
        <div className={cn({ [s.ownerStatus]: props.isOwner }, s.status )}>
          <b>Status: </b>
          <span onClick={props.isOwner ? activateEditMode : null}>
            {props.status || "Where is status?"}
          </span>
        </div>
      )}
      {editMode && props.isOwner && (
        <div className={s.status}>
          <input
            onChange={onStatusChange}
            autoFocus={true}
            onBlur={deactivateEditMode}
            value={status}
          />
        </div>
      )}
    </div>
  );
};

export default ProfileStatusWithHooks;
