import React from "react";
import style from "./style.module.scss";
import { Typography } from "antd";
import clsx from "clsx";

const Loading = ({ isLoading, isOuting }) => {
  return (
    <div
      className={clsx(style.loadingPage, {
        ["animate__animated animate__fadeOut animate__fast"]: isOuting,
      })}
    >
      <div className={style.title}>
        <Typography.Title level={1}>CRM TEMPLATE</Typography.Title>
        <div
          className={clsx(style.loader, { [style.action]: isLoading })}
        ></div>
      </div>
    </div>
  );
};

export default Loading;
