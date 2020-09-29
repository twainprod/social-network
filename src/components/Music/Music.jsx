import React from "react";
import s from "./Music.module.css";

const Music = (props) => {
  return (
    <>
      <div className={s.title}>Music</div>
      <div className={s.body}>Here must be Block with Music.</div>
    </>
  );
};

export default Music;
