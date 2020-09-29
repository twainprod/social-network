import React from "react";
import s from "./News.module.css";

const News = (props) => {
  return (
    <>
      <div className={s.title}>News</div>
      <div className={s.body}>Here must be Block with News.</div>
    </>
  );
};

export default News;
