import React from "react";

import {
  AppstoreOutlined,
  ContainerOutlined,
  CarOutlined,
  DashboardOutlined,
  FileWordOutlined,
  ImportOutlined,
  BarsOutlined,
  BarcodeOutlined,
} from "@ant-design/icons";

const useIcon = () => {
  const getIcon = (name?: any) => {
    switch (name) {
      case "GLOG_MENU_DASHBOARD":
        return <DashboardOutlined />;
      case "GLOG_MENU_MANAGE_ORDER_LIST":
        return <AppstoreOutlined />;
      case "GLOG_MENU_MANAGE_ORDER_ACTIVE_LIST":
        return <ContainerOutlined />;
      case "GLOG_MENU_MANAGE_TRANSFER_ORDER_LIST":
        return <CarOutlined />;
      case "GLOG_MENU_REPORT_LIST":
        return <FileWordOutlined />;
      case "GLOG_MENU_IMPORT_LIST":
        return <ImportOutlined />;
      case "GLOG_MENU_COMMON_MANAGE":
        return <BarsOutlined />;
      case "GLOG_MENU_SCAN_BARCODE_MANAGE":
        return <BarcodeOutlined />;
      default:
        return <></>;
    }
  };

  return {
    getIcon: getIcon,
  };
};

export default useIcon;
