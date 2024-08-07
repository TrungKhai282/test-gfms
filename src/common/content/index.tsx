import React from "react";

import { Breadcrumb, Layout } from "antd";
import {
  BreadcrumbItemType,
  BreadcrumbSeparatorType,
} from "antd/es/breadcrumb/Breadcrumb";
import { Flex, Typography, theme } from "antd";

type ScreenPropsType = {
  title: React.ReactNode;
  breadcrumbItems?: Partial<BreadcrumbItemType & BreadcrumbSeparatorType>[];
  children?: React.ReactNode;
};

export const ContentLayout = (props: ScreenPropsType) => {
  const { title, breadcrumbItems, children } = props;

  return (
    <div style={{ position: "relative" }}>
      <Flex justify="space-between" align="center">
        <Typography.Title
          level={5}
          style={{
            margin: "24px 0",
            textTransform: "uppercase",
          }}
        >
          {title}
        </Typography.Title>
        {breadcrumbItems && breadcrumbItems.length > 0 && (
          <Breadcrumb items={breadcrumbItems} />
        )}
      </Flex>
      {children}
    </div>
  );
};

type ContentPropsType = {
  children: React.ReactNode;
  title?: string;
};
export const ContentBody = ({ children, title }: ContentPropsType) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const styleContentBody: React.CSSProperties = {
    padding: "24px",
    margin: "12px 0 24px 0",
    background: colorBgContainer,
    borderRadius: borderRadiusLG,
  };
  return (
    <Layout.Content style={styleContentBody}>
      {title && (
        <h4
          style={{
            margin: 0,
            paddingBottom: "24px",
          }}
        >
          {title}
        </h4>
      )}
      {children}
    </Layout.Content>
  );
};
