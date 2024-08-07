import { ContentBody } from "@/common/content";
import { Button, Table, TableProps, Tag, Tooltip, theme } from "antd";
import React from "react";
import { EditOutlined, LockTwoTone, UnlockTwoTone } from "@ant-design/icons";
import useTable from "@/common/utils/useTable";
import dayjs from "dayjs";
import { modifieldTableStatus } from "../common/utils";
import { UserListTablePropTypes } from "../common/type";
import { unActiveUser, updateUser } from "@/hooks/user/useUser";
import { USER_FROM_TYPE } from "../common/constant";
import { handleReturnArray } from "@/common/utils/interactor.util";

const UserListTable = ({
  tableData,
  isLoading,
  setUserListParams,
  reFetchUserList,
  openDetail,
}: UserListTablePropTypes) => {
  const { getFilterSearchBox, getFilterSelectBox } = useTable();
  const { token } = theme.useToken();

  const userTypeOptions = [
    {
      label: "ADMIN",
      value: 1,
    },
    {
      label: "RUNNER",
      value: 2,
    },
    {
      label: "SALE",
      value: 3,
    },
  ];

  const columns: TableProps["columns"] = [
    {
      title: "STT",
      dataIndex: "index",
      rowScope: "row",
      render: (_value, _record, index) => index + 1,
      align: "center",
    },
    {
      title: "Tên đăng nhập",
      dataIndex: "username",
      key: "username",
      ...getFilterSearchBox({
        name: "username",
        placeholder: "Vui lòng nhập...",
      }),
    },
    {
      title: "Tên nhân viên",
      dataIndex: "display_name",
      key: "display_name",
      sorter: true,
      showSorterTooltip: {
        title: "Nhấn để sắp xếp theo tên",
      },
      ...getFilterSearchBox({
        name: "display_name",
        placeholder: "Vui lòng nhập...",
      }),
    },
    {
      title: "Vai trò",
      dataIndex: "roles",
      key: "roles",
      render: (_, { ext_value }) => <>{ext_value?.roles[0]}</>,
      ...getFilterSelectBox({
        name: "roles",
        placeholder: "Vui lòng nhập...",
        options: userTypeOptions,
      }),
    },
    {
      title: "Trạng thái",
      dataIndex: "record_status",
      key: "record_status",
      align: "center",
      render: (value) =>
        value === "C" ? (
          <Tag color="red">Ngừng kích hoạt</Tag>
        ) : (
          <Tag color="green">Kích hoạt</Tag>
        ),
      ...getFilterSelectBox({
        name: "record_status",
        placeholder: "Vui lòng nhập...",
        options: [
          {
            label: "Kích hoạt",
            value: "O",
          },
          {
            label: "Ngừng kích hoạt",
            value: "C",
          },
        ],
      }),
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "checker_date",
      key: "checker_date",
      render: (value, _record, _index) => (
        <>{dayjs(parseInt(value) * 1000).format("DD/MM/YYYY HH:mm:ss")}</>
      ),
      showSorterTooltip: {
        title: "Sắp xếp theo Ngày cập nhật",
      },
      sorter: true,
    },
    {
      title: "Người cập nhật",
      dataIndex: "checker_id",
      key: "checker_id",
    },
    {
      title: "",
      key: "action",
      fixed: "right",
      render: (value, record, _index) => (
        <>
          <Tooltip placement="left" title={"Chỉnh sửa"}>
            <Button
              type="text"
              size="small"
              onClick={() => openDetail(record.id, USER_FROM_TYPE.UPDATE)}
            >
              <EditOutlined />
            </Button>
          </Tooltip>
          {record.record_status === "O" ? (
            <Tooltip placement="left" title={"Ngừng kích hoạt"}>
              <Button
                type="text"
                size="small"
                onClick={() => handleRecordStatus(record)}
              >
                <LockTwoTone
                  twoToneColor={[token.colorError, token.colorBgContainer]}
                />
              </Button>
            </Tooltip>
          ) : (
            <Tooltip placement="left" title={"Kích hoạt"}>
              <Button
                type="text"
                size="small"
                onClick={() => handleRecordStatus(record)}
              >
                <UnlockTwoTone
                  twoToneColor={[token.colorSuccess, token.colorBgContainer]}
                />
              </Button>
            </Tooltip>
          )}
        </>
      ),
    },
  ];

  const onTableChange: TableProps["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    const statusTable = modifieldTableStatus(
      pagination,
      filters,
      sorter,
      extra
    );
    setUserListParams((prev) => ({
      ...prev,
      ...statusTable,
    }));
    // console.log("sorter :>> ", sorter);
    // console.log("pagination :>> ", pagination);
    // console.log("filters :>> ", filters);
  };

  const onSuccessHandleStatus = () => {
    reFetchUserList();
  };

  const { mutate: updateUserMutate } = updateUser(onSuccessHandleStatus);
  const { mutate: unActiveUserMutate } = unActiveUser(onSuccessHandleStatus);

  const handleRecordStatus = (record) => {
    const isUnActiveAction = record.record_status === "O";
    if (isUnActiveAction) {
      unActiveUserMutate(record.id);
    } else {
      updateUserMutate({
        id: record.id,
        data: {
          record_status: "O",
          display_name: record.display_name,
          roles: record.ext_value.roles,
          email: record.email,
          phone: record.phone,
        },
      });
    }
  };

  return (
    <ContentBody>
      <Table
        scroll={{ x: "max-content" }}
        rowKey={"id"}
        columns={columns}
        dataSource={handleReturnArray(tableData, "items")}
        pagination={{
          showSizeChanger: true,
          defaultCurrent: 1,
          total: 20,
        }}
        onChange={onTableChange}
        loading={isLoading}
        onRow={(record) => {
          return {
            onDoubleClick: () => openDetail(record.id, USER_FROM_TYPE.VIEW),
          };
        }}
      />
    </ContentBody>
  );
};

export default UserListTable;
