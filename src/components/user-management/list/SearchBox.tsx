import { ContentBody } from "@/common/content";
import {
  Button,
  Col,
  Flex,
  Form,
  FormItemProps,
  Input,
  Row,
  Select,
  DatePicker,
  DatePickerProps,
  Dropdown,
  MenuProps,
  Space,
} from "antd";
import React from "react";
import { rules } from "./SearchBoxValidate";
import { RangePickerProps } from "antd/es/date-picker";
import { DownOutlined, FileTextOutlined } from "@ant-design/icons";
import { blue } from "@ant-design/colors";
import { openNotification } from "@/common/notification";
import Search, { SearchProps } from "antd/es/input/Search";
import * as R from "ramda";
import Link from "next/link";
import { PRIVATE_ROUTE } from "@/common/routers";

const Item = ({ children, ...props }: FormItemProps) => (
  <Form.Item {...props} rules={[rules]}>
    {children}
  </Form.Item>
);

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
  },
};

const SearchBox = ({ setUserListParams }) => {
  const [form] = Form.useForm();
  const onSearch: SearchProps["onSearch"] = (value, _e, _info) => {
    setUserListParams((prev) => ({
      ...prev,
      keyword: !R.isEmpty(value) ? value : undefined,
    }));
  };

  return (
    <ContentBody>
      <Form
        form={form}
        name="search-form"
        labelAlign="left"
        labelWrap
        {...formItemLayout}
      >
        {/* <Row gutter={[48, 0]}>
          <Col xs={24} lg={12}>
            <Item name="loginName" label="Tên đăng nhập">
              <Input placeholder="Please input" />
            </Item>
          </Col>
          <Col xs={24} lg={12}>
            <Item name="userName" label="Tên nhân viên">
              <Input placeholder="Please input" />
            </Item>
          </Col>
          <Col xs={24} lg={12}>
            <Item name="status" label="Trạng thái">
              <Select
                placeholder="Chọn trạng thái"
                allowClear
                options={[
                  {
                    label: "Kích hoạt",
                    value: "active",
                  },
                  {
                    label: "Ngừng kích hoạt",
                    value: "un_active",
                  },
                ]}
              />
            </Item>
          </Col>
          <Col xs={24} lg={12}>
            <Item name="creater" label="Người tạo">
              <Select
                placeholder="Chọn người tạo"
                allowClear
                showSearch
                options={[
                  {
                    label: "Người tạo 1",
                    value: "creater1",
                  },
                  {
                    label: "Người tạo 2",
                    value: "creater2",
                  },
                  {
                    label: "Người tạo 3",
                    value: "creater3",
                  },
                ]}
              />
            </Item>
          </Col>
          <Col xs={24} lg={12}>
            <Item name="create_date" label="Ngày tạo">
              <DatePicker.RangePicker
                style={{ width: "100%" }}
                format={"YYYY/MM/DD"}
              />
            </Item>
          </Col>
          <Col xs={24} lg={12}>
            <Item name="updater" label="Người cập nhật">
              <Select
                placeholder="Chọn người cập nhật"
                allowClear
                showSearch
                options={[
                  {
                    label: "Người cập nhật 1",
                    value: "updater1",
                  },
                  {
                    label: "Người cập nhật 2",
                    value: "updater2",
                  },
                  {
                    label: "Người cập nhật 3",
                    value: "updater3",
                  },
                ]}
              />
            </Item>
          </Col>
          <Col xs={24} lg={12}>
            <Item name="update_date" label="Ngày cập nhật">
              <DatePicker.RangePicker
                style={{ width: "100%" }}
                format={"YYYY/MM/DD"}
              />
            </Item>
          </Col>
        </Row> */}
        <Row gutter={[16, 16]}>
          <Col sm={24} md={7}>
            <Input.Search
              placeholder="Input search text"
              onSearch={onSearch}
              enterButton
              allowClear
            />
          </Col>
          {/* <Col>
            <Button type="primary" htmlType="submit">
              Lọc
            </Button>
          </Col>
          <Col>
            <Button danger type="primary" onClick={() => form.resetFields()}>
              Đặt lại
            </Button>
          </Col> */}
          <Col>
            <Dropdown
              menu={{
                items: [
                  {
                    label: "3rd menu item",
                    key: "3",
                    danger: true,
                  },
                  {
                    label: "4rd menu item",
                    key: "4",
                    danger: true,
                    disabled: true,
                  },
                ],
              }}
            >
              <Button>
                <Space>
                  <FileTextOutlined />
                  Tác vụ
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
          </Col>
          <Col>
            <Link href={PRIVATE_ROUTE.USER_MANAGERMENT_CREATE}>
              <Button className="btn-secondary">Thêm mới nhân viên</Button>
            </Link>
          </Col>
        </Row>
      </Form>
    </ContentBody>
  );
};

export default SearchBox;
