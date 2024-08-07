import { ContentBody, ContentLayout } from "@/common/content";
import { PRIVATE_ROUTE } from "@/common/routers";
import Link from "next/link";
import React from "react";

const WorlflowScreen = () => {
  return (
    <ContentLayout
      title="Danh sách quy trình"
      breadcrumbItems={[
        {
          title: <Link href={PRIVATE_ROUTE.HOME}>Dashboard</Link>,
        },
        {
          title: "Danh sách quy trình",
        },
      ]}
    >
      <ContentBody>Danh sách quy trình</ContentBody>
    </ContentLayout>
  );
};

export default WorlflowScreen;
