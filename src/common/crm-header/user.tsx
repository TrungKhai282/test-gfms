import { Avatar, Button, Dropdown, Flex, MenuProps, Space } from "antd";
import React, { useEffect } from "react";
import { DownOutlined } from "@ant-design/icons";
import useAuth from "@/hooks/auth/useAuth";

const User = () => {
  const { logout, profileQuery } = useAuth();
  const { data: profile, refetch: fetchProfile } = profileQuery();

  const items: MenuProps["items"] = [
    {
      label: "Đăng xuất",
      key: "0",
      onClick: () => logout.mutate(),
    },
  ];

  useEffect(() => {
    fetchProfile();
  }, []);
  return (
    <Flex align="center" gap={8}>
      <Avatar
        size={28}
        src={<img src={"/default-avatar.svg"} alt="avatar" />}
      />
      <Dropdown menu={{ items }} trigger={["click"]}>
        <Button type="text">
          <Space>
            {profile?.display_name}
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>
    </Flex>
  );
};

export default User;
