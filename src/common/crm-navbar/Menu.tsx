import React from "react";
import { Menu as AntMenu } from "antd";
import { usePathname } from "next/navigation";
import { PRIVATE_ROUTE } from "@/common/routers";
import style from "./style.module.scss";
import clsx from "clsx";

const Menu = ({ horizontal = false, menuItems }) => {
  const pathname = usePathname();
  return (
    <AntMenu
      theme="dark"
      mode={horizontal ? "horizontal" : "inline"}
      defaultSelectedKeys={[PRIVATE_ROUTE.HOME]}
      selectedKeys={[pathname]}
      items={menuItems}
      className={clsx({ [style.menuHorizontal]: horizontal })}
    />
  );
};

export default Menu;
