import { MenuProps } from "antd";
import { isNotEmpty } from "../utils/interactor.util";
import Link from "next/link";
import {
  ReadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  DashboardOutlined,
  TeamOutlined,
} from "@ant-design/icons";

export type MenuItem = Required<MenuProps>["items"][number];

export const iconMenu = {
  "/dashboard": "DashboardOutlined",
};
