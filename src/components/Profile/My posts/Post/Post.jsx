import React from "react";
import s from "./Post.module.css";
import userPhoto from "./../../../../img/user.jpg";

const Post = (props) => {
  return (
    <div>
      <div className={s.item}>
        <img src={props.profile.photos.small || userPhoto} />
        {props.text}
        <br />
        <span>{props.likesCount} ♥</span>
      </div>
    </div>
  );
};
export default Post;
