import React, { useEffect } from "react";
import {
  Button,
  Checkbox,
  Col,
  Form,
  FormItemProps,
  Input,
  Row,
  Select,
} from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { rules } from "./validate";
import { PRIVATE_ROUTE } from "@/common/routers";
import { createUser, defaultRoleQuery, updateUser } from "@/hooks/user/useUser";
import {
  clearDuplicateInArrayWithFieldName,
  isNotEmpty,
  sliceString,
} from "@/common/utils/interactor.util";
import { useRouter } from "next/navigation";
import { EMAIL_DOMAIN, USER_FROM_TYPE } from "../common/constant";

const Item = ({ children, ...props }: FormItemProps) => (
  <Form.Item {...props} rules={[rules]}>
    {children}
  </Form.Item>
);

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
};
const UserForm = ({
  type,
  detailData,
  onSuccessSubmit,
}: {
  type: string;
  detailData?: any;
  onSuccessSubmit?: () => void;
}) => {
  const [form] = Form.useForm();
  const router = useRouter();

  const { data: defaultRoleData, refetch: fetchDefaultRole } =
    defaultRoleQuery();

  const onSuccessCreate = () => {
    router.push(PRIVATE_ROUTE.USER_MANAGERMENT_LIST);
  };
  const { mutate: addNewUser } = createUser(onSuccessCreate);
  const { mutate: updateUserMutate } = updateUser(onSuccessSubmit);

  useEffect(() => {
    fetchDefaultRole();
  }, []);

  const setDefaultDataDetail = (detailData) => {
    form.setFieldsValue({
      phone: isNotEmpty(detailData.phone) ? detailData.phone : undefined,
      display_name: isNotEmpty(detailData.display_name)
        ? detailData.display_name
        : undefined,
      email: isNotEmpty(detailData.email) ? detailData.email : undefined,
      username: isNotEmpty(detailData.username)
        ? sliceString(detailData.username, EMAIL_DOMAIN)
        : undefined,
      roles: isNotEmpty(detailData.ext_value.roles)
        ? detailData.ext_value.roles
        : undefined,
    });
  };

  useEffect(() => {
    if (detailData) {
      setDefaultDataDetail(detailData);
    }
  }, [detailData]);

  const onSubmitCreateForm = (values: any) => {
    const data = {
      ...values,
      username: values.username + EMAIL_DOMAIN,
    };

    if (type === USER_FROM_TYPE.CREATE) {
      addNewUser(data);
    } else {
      updateUserMutate({
        id: detailData.id,
        data,
      });
    }
  };

  const onResetForm = () => {
    if (type === USER_FROM_TYPE.CREATE) {
      form.resetFields();
    } else {
      setDefaultDataDetail(detailData);
    }
  };

  return (
    <Form
      form={form}
      name="create-user-form"
      labelAlign="left"
      labelWrap
      onFinish={onSubmitCreateForm}
      disabled={type === USER_FROM_TYPE.VIEW}
      {...formItemLayout}
    >
      <Row gutter={[48, 0]}>
        <Col xs={24} lg={12}>
          <Item name="display_name" label="Họ và tên" required>
            <Input placeholder="Please input" />
          </Item>
        </Col>
        <Col xs={24} lg={12}>
          <Item name="phone" label="Số điện thoại">
            <Input placeholder="Please input" />
          </Item>
        </Col>
        <Col xs={24} lg={12}>
          <Item name="email" label="Email liên hệ" required>
            <Input placeholder="Please input" />
          </Item>
        </Col>
        <Col xs={24} lg={12}>
          <Item name="username" label="Tên đăng nhập" required>
            <Input
              placeholder="Please input"
              addonAfter={
                <Select defaultValue="@genesolutions.vn">
                  <Select.Option value="@genesolutions.vn">
                    @genesolutions.vn
                  </Select.Option>
                </Select>
              }
            />
          </Item>
        </Col>
        <Col xs={24} lg={24}>
          <Item name="roles" label="Vai trò" required>
            <Checkbox.Group>
              <Row gutter={[8, 16]}>
                {clearDuplicateInArrayWithFieldName(
                  defaultRoleData?.items,
                  "code"
                )?.map((option) => (
                  <Col key={option.code} xs={12} md={8} lg={6}>
                    <Checkbox value={option.code}>{option.name}</Checkbox>
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>
          </Item>
        </Col>
      </Row>
      {type !== USER_FROM_TYPE.VIEW && (
        <Row gutter={[16, 0]}>
          <Col>
            <Button type="primary" htmlType="submit">
              Xác nhận
            </Button>
          </Col>
          <Col>
            <Button danger type="dashed" onClick={onResetForm}>
              <ReloadOutlined /> Đặt lại
            </Button>
          </Col>
        </Row>
      )}
    </Form>
  );
};

export default UserForm;
