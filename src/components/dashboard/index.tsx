import React from "react";

import { ContentBody, ContentLayout } from "@/common/content";
import { Typography } from "antd";

const DashboardScreen = () => {
  return (
    <ContentLayout title="Bảng điều khiển">
      <ContentBody>
        <Typography.Text>Bảng điều khiển</Typography.Text>{" "}
      </ContentBody>
    </ContentLayout>
  );
};

export default DashboardScreen;
