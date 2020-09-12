import React from "react";
import s from "./Loader.module.css";

let Loader = () => {
  return (
    <div className={s.aligned}>
      <div className={s.ldsRing}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
