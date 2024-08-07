import React from "react";
import style from "./style.module.scss";

const Loading = () => {
  return (
    <div className={style.suspense}>
      <div className={style.loader}></div>
    </div>
  );
};

export default Loading;
