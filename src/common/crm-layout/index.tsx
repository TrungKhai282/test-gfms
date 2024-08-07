import { Layout, Spin } from "antd";
import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import CrmNavbar, { CrmNavbarHorizontal } from "../crm-navbar";
import CrmHeader from "../crm-header";
import { Content } from "antd/es/layout/layout";
import CrmDrawer from "../crm-drawer";
import style from "./style.module.scss";
import { PRIVATE_ROUTE, PUBLIC_ROUTE } from "@/common/routers";
import useAuth from "@/hooks/auth/useAuth";
import { AUTH_TOKEN } from "../contants/auth.constant";
import clsx from "clsx";
import useThemeConfig from "../styles/useThemeConfig";
import { MENU_MODE } from "../contants/theme.constant";
import { menuQuery } from "@/hooks/menu/useMenu";
import useIcon from "../crm-navbar/useIcon";
import { MenuItem } from "../crm-navbar/util";
import {
  clearDuplicateInArrayWithFieldName,
  isNotEmpty,
  removeItemInArrayWithCondition,
  sortArrayByFieldPath,
} from "../utils/interactor.util";
import Link from "next/link";
import Loading from "../loading";
import { usePathname, useRouter } from "next/navigation";
import { menuData } from "../crm-navbar/contants";

type PropTypes = {
  children: React.ReactNode;
};

const CrmLayout = ({ children }: PropTypes) => {
  const [shouldLoading, setShouldLoading] = useState(true);
  const [outingLoading, setOutingLoading] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { menuMode } = useThemeConfig();
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(false);
  const toggleDrawer = () => {
    setIsOpenDrawer((prev) => !prev);
  };
  const toggleCollapsedNavbar = (value?: boolean) => {
    setIsNavbarCollapsed((prev) => (value !== undefined ? value : !prev));
  };
  const { data: menu, isLoading: isLoadingMenu } = menuQuery();
  const { getIcon } = useIcon();

  const getMenuItemProps = (item): MenuItem & { access_link: string } => {
    const extend = {};

    if (isNotEmpty(item.children)) {
      extend["children"] = item.children.map((item) => getMenuItemProps(item));
    }

    return {
      key: item.accessLink,
      icon: getIcon(item.menuCode),
      label: isNotEmpty(item.children) ? (
        item.menuName
      ) : (
        <Link href={item.accessLink}>{item.menuName}</Link>
      ),
      access_link: item.accessLink,
      ...extend,
    };
  };

  // const menuDataHandler = useMemo(() => {
  //   console.log("menu.items", menu?.items);
  //   if (menu && isNotEmpty(menu.items)) {
  //     return clearDuplicateInArrayWithFieldName(
  //       removeItemInArrayWithCondition(
  //         sortArrayByFieldPath(["menuOrder"], menu.items),
  //         (item) => item.accessLink === "notification-management/list"
  //       ),
  //       "id"
  //     ).map((item) => getMenuItemProps(item));
  //   }
  //   return [];
  // }, [menu]);

  const menuDataHandler = useMemo(() => {
    if (isNotEmpty(menuData)) {
      return clearDuplicateInArrayWithFieldName(
        removeItemInArrayWithCondition(
          sortArrayByFieldPath(["menuOrder"], menuData),
          (item) => item.accessLink === "notification-management/list"
        ),
        "id"
      ).map((item) => getMenuItemProps(item));
    }
    return [];
  }, [menuData]);

  useEffect(() => {
    if (isNotEmpty(menuDataHandler)) {
      const condition1 =
        pathname === PRIVATE_ROUTE.HOME || pathname === PRIVATE_ROUTE.DASHBOARD;
      const condition2 =
        menuDataHandler[0].access_link !== PRIVATE_ROUTE.HOME &&
        menuDataHandler[0].access_link !== PRIVATE_ROUTE.DASHBOARD;

      if (condition1 && condition2) {
        router.replace(menuDataHandler[0].access_link);
      } else {
        setTimeout(() => {
          setOutingLoading(true);
        }, 1000);
        setTimeout(() => {
          setShouldLoading(false);
        }, 1800);
      }
    }
  }, [menuDataHandler]);

  return (
    <Layout className={clsx(style.crmLayout, "lazy-component", "fadeIn")}>
      {menuMode === MENU_MODE.VERTICAL && (
        <CrmNavbar
          isCollapsed={isNavbarCollapsed}
          toggleCollapsed={toggleCollapsedNavbar}
          menuDataHandler={menuDataHandler}
        />
      )}
      <Layout className={style.layoutRight}>
        <CrmHeader
          toggleDrawer={toggleDrawer}
          isNavbarCollapsed={isNavbarCollapsed}
          toggleCollapsedNavbar={toggleCollapsedNavbar}
        />
        {menuMode === MENU_MODE.HORIZONTAL && (
          <CrmNavbarHorizontal menuDataHandler={menuDataHandler} />
        )}
        <Content
          className={clsx(style.content, {
            [style.horizontal]: menuMode === MENU_MODE.HORIZONTAL,
          })}
        >
          {children}
        </Content>
      </Layout>
      <CrmDrawer isOpen={isOpenDrawer} toggle={toggleDrawer} />
      {shouldLoading && (
        <Loading isLoading={shouldLoading} isOuting={outingLoading} />
      )}
    </Layout>
  );
};

export default CrmLayout;
