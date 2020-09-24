import React from "react";
import s from "./Post.module.css";
import userPhoto from "./../../../../img/user.jpg";

const Post = (props) => {
  return (
    <div>
      <div className={s.item}>
        <img src={props.profile.photos.small || userPhoto} />
        <div className={s.message}>{props.text}</div>
        <br />
        <span>
          {props.likesCount} <div>♥</div>
        </span>
      </div>
    </div>
  );
};
export default Post;
