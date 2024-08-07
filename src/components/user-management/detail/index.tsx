import { Modal, Table, TableProps } from "antd";
import React, { useEffect, useMemo } from "react";
import UserForm from "../create/UserForm";
import { USER_FROM_TYPE } from "../common/constant";
import { userDetail } from "@/hooks/user/useUser";
import { CreateFormType } from "../common/type";

const DetailUser = ({
  type,
  detailId,
  isOpenDetail,
  closeDetail,
  reFetchUserList,
}) => {
  const handleOk = () => {};

  const { data: detailData, refetch: fetchDetail } = userDetail(detailId);

  useEffect(() => {
    if (detailId && isOpenDetail) {
      fetchDetail();
    }
  }, [detailId]);

  return (
    <Modal
      title={
        type === USER_FROM_TYPE.VIEW
          ? "Chi tiết người dùng"
          : "Cập nhật người dùng"
      }
      open={isOpenDetail}
      onOk={handleOk}
      onCancel={closeDetail}
      footer={false}
      width="80%"
    >
      <UserForm
        type={type}
        detailData={detailData}
        onSuccessSubmit={() => {
          closeDetail();
          reFetchUserList();
        }}
      />
    </Modal>
  );
};

export default DetailUser;
