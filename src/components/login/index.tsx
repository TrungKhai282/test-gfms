import React from "react";
import style from "./style.module.scss";
import { Button, Checkbox, Flex, Form, Input, Space, Typography } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { payloadLogin } from "@/apis/auth.api";
import useAuth from "@/hooks/auth/useAuth";

const LoginScreen = () => {
  const { login } = useAuth();

  const { mutate, isPending } = login;

  const onFinish = (values: payloadLogin) => {
    login.mutate(values);
  };

  return (
    <div className={style.loginScreen}>
      <div className={style.left}>
        <Typography.Title className={style.textLogo}>
          CRM <br /> TEMPLATE
        </Typography.Title>
      </div>
      <div className={style.right}>
        <Space direction="vertical" size="large" className={style.loginForm}>
          <div className={style.title}>
            <Typography.Title className={style.textLogo}>
              CRM <br /> TEMPLATE
            </Typography.Title>
            <Typography.Title level={4}>Chào mừng bạn !</Typography.Title>
            <Typography.Text type="secondary">
              Vui lòng đăng nhập để sử dụng hệ thống
            </Typography.Text>
          </div>
          <Form
            name="normal_login"
            className={style.mainForm}
            onFinish={onFinish}
            initialValues={{
              rememberMe: false,
            }}
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your Username!" },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Password"
              />
            </Form.Item>
            <Flex align="baseline" gap={16}>
              <Form.Item name="rememberMe" valuePropName="checked">
                <Checkbox>Ghi nhớ đăng nhập</Checkbox>
              </Form.Item>

              <a className="login-form-forgot" href="">
                Forgot password
              </a>
            </Flex>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className={style.btnSubmit}
                loading={isPending}
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
        </Space>
      </div>
    </div>
  );
};

export default LoginScreen;
