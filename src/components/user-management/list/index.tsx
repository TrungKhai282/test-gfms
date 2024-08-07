import React, { useEffect, useState } from "react";
import { ContentLayout } from "@/common/content";
import { userListQuery } from "@/hooks/user/useUser";
import Link from "next/link";
import { PRIVATE_ROUTE } from "@/common/routers";
import SearchBox from "./SearchBox";
import UserListTable from "./UserListTable";
import DetailUser from "../detail";
import {
  initialDetailUserState,
  initialUserListParams,
} from "../common/constant";

const ListUserScreen = () => {
  const [params, setParams] = useState(initialUserListParams);
  const [detailUser, setUserDetail] = useState(initialDetailUserState);

  const {
    isLoading: isUserListLoading,
    data: userListData,
    refetch: fetchListQuery,
  } = userListQuery(params);

  useEffect(() => {
    fetchListQuery();
  }, [params]);

  const closeDetail = () => {
    setUserDetail(initialDetailUserState);
  };

  const openDetail = (id: number, type: string) => {
    setUserDetail({
      isOpen: true,
      id,
      type,
    });
  };

  return (
    <ContentLayout
      title="Danh sách người dùng"
      breadcrumbItems={[
        {
          title: <Link href={PRIVATE_ROUTE.HOME}>Dashboard</Link>,
        },
        {
          title: "Quản lý người dùng",
        },
        {
          title: "Danh sách",
        },
      ]}
    >
      <SearchBox setUserListParams={setParams} />
      <UserListTable
        setUserListParams={setParams}
        tableData={userListData}
        isLoading={isUserListLoading}
        reFetchUserList={fetchListQuery}
        openDetail={openDetail}
      />
      <DetailUser
        type={detailUser.type}
        detailId={detailUser.id}
        isOpenDetail={detailUser.isOpen}
        closeDetail={closeDetail}
        reFetchUserList={fetchListQuery}
      />
    </ContentLayout>
  );
};

export default ListUserScreen;
