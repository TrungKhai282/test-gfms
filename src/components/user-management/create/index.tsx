import React from "react";
import { ContentLayout, ContentBody } from "@/common/content";
import Link from "next/link";
import { PRIVATE_ROUTE } from "@/common/routers";
import UserForm from "./UserForm";
import { USER_FROM_TYPE } from "../common/constant";
const CreateUserScreen = () => {
  return (
    <ContentLayout
      title="Tạo mới người dùng"
      breadcrumbItems={[
        {
          title: <Link href={PRIVATE_ROUTE.HOME}>Dashboard</Link>,
        },
        {
          title: "Quản lý người dùng",
        },
        {
          title: "Tạo mới",
        },
      ]}
    >
      <ContentBody>
        <UserForm type={USER_FROM_TYPE.CREATE} />
      </ContentBody>
    </ContentLayout>
  );
};

export default CreateUserScreen;
