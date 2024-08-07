import { Col, Drawer, Radio, Row, Typography } from "antd";
import React from "react";
import useThemeConfig from "@/common/styles/useThemeConfig";
import { MENU_MODE } from "../contants/theme.constant";

const CrmDrawer = ({ isOpen, toggle }) => {
  const { isDarkMode, handleChangeTheme, menuMode, handleChangeMenuMode } =
    useThemeConfig();
  return (
    <Drawer
      title="Cài đặt trang"
      placement={"right"}
      closable={false}
      onClose={toggle}
      open={isOpen}
      key={"setting-drawer"}
    >
      <Row gutter={[16, 24]}>
        <Col xs="24">
          <Typography.Paragraph>Giao diện: </Typography.Paragraph>
          <Radio.Group
            value={isDarkMode}
            onChange={(e) => handleChangeTheme(e.target.value)}
          >
            <Radio value={"false"}>Sáng</Radio>
            <Radio value={"true"}>Tối</Radio>
          </Radio.Group>
        </Col>
        <Col xs={24}>
          <Typography.Paragraph>Kiểu menu: </Typography.Paragraph>
          <Radio.Group
            value={menuMode}
            onChange={(e) => handleChangeMenuMode(e.target.value)}
          >
            <Radio value={MENU_MODE.HORIZONTAL}>Ngang</Radio>
            <Radio value={MENU_MODE.VERTICAL}>Dọc</Radio>
          </Radio.Group>
        </Col>
      </Row>
    </Drawer>
  );
};

export default CrmDrawer;
