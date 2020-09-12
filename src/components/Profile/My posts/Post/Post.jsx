import React from "react";
import s from "./Post.module.css";

const Post = (props) => {
  return (
    <div>
      <div className={s.item}>
        <img
          src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
          alt=""
        />
        {props.text}
        <br />
        <span>{props.likesCount} ♥</span>
      </div>
    </div>
  );
};
export default Post;
