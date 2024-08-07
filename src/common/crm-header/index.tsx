import { Layout, Button, theme, Flex, Typography } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
} from "@ant-design/icons";

import style from "./style.module.scss";
import User from "./user";
import useThemeConfig from "../styles/useThemeConfig";
import { MENU_MODE } from "../contants/theme.constant";
import clsx from "clsx";

const { Header } = Layout;

const CrmHeader = ({
  toggleDrawer,
  isNavbarCollapsed,
  toggleCollapsedNavbar,
}) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { menuMode } = useThemeConfig();

  return (
    <Header
      className={clsx(style.header, {
        [style.horizontal]: menuMode === MENU_MODE.HORIZONTAL,
      })}
      style={{ background: colorBgContainer }}
    >
      {menuMode === MENU_MODE.VERTICAL ? (
        <Button
          type="text"
          icon={
            isNavbarCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
          }
          onClick={() => toggleCollapsedNavbar()}
          className={style.btnCollapse}
        />
      ) : (
        <Typography.Title level={4} className={style.logo}>
          CRM TEMPLATE
        </Typography.Title>
      )}
      <Flex align="center" justify="flex-end" gap={20}>
        <User />
        <Button
          className={style.btnSetting}
          type="text"
          icon={<SettingOutlined className={style.iconSetting} />}
          onClick={toggleDrawer}
        />
      </Flex>
    </Header>
  );
};

export default CrmHeader;
