import { Flex, Layout, theme } from "antd";
import React, { useMemo } from "react";

import style from "./style.module.scss";
import Menu from "./Menu";
import {
  clearDuplicateInArrayWithFieldName,
  isNotEmpty,
  removeItemInArrayWithCondition,
  sortArrayByFieldPath,
} from "../utils/interactor.util";
import { MenuItem } from "./util";
import { menuQuery } from "@/hooks/menu/useMenu";
import useIcon from "./useIcon";
import Link from "next/link";
import LazyComponent from "../lazy-component";

const { Sider, Header } = Layout;

const CrmNavbar = ({ isCollapsed, toggleCollapsed, menuDataHandler }) => {
  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={!isNotEmpty(menuDataHandler) || isCollapsed}
      width={250}
      breakpoint="lg"
      onBreakpoint={(broken) => toggleCollapsed(broken)}
      defaultCollapsed={false}
      className={style.navbar}
    >
      <Flex justify="center" align="center" className={style.logo}>
        {!isNotEmpty(menuDataHandler) || isCollapsed ? "CRM" : "CRM TEMPLATE"}
      </Flex>
      <div className={style.menuVertical}>
        <Menu menuItems={menuDataHandler} />
      </div>
    </Sider>
  );
};

export const CrmNavbarHorizontal = ({ menuDataHandler }) => {
  return (
    isNotEmpty(menuDataHandler) && (
      <LazyComponent>
        <Header className={style.headerHorizontal}>
          <Menu horizontal menuItems={menuDataHandler} />
        </Header>
      </LazyComponent>
    )
  );
};

export default CrmNavbar;
