import React from "react";
import s from "./Post.module.css";
import userPhoto from "./../../../../img/user.jpg";
import { useState } from "react";

const Post = (props) => {

  const [count, setCount] = useState(props.likesCount);

  return (
    <div>
      <div className={s.item}>
        <img src={props.profile.photos.small || userPhoto} alt="userPhoto" />
        <div className={s.message}>{props.text}</div>
        <br />
        <div className={s.likes}>
          <span onClick={() => {
            setCount(count + 1);
          }}>{count} <span className={s.heart}>♥</span></span>
        </div>
      </div>
    </div>
  );
};
export default Post;
