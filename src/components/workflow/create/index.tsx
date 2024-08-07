import { ContentBody, ContentLayout } from "@/common/content";
import { PRIVATE_ROUTE } from "@/common/routers";
import dynamic from "next/dynamic";
import Link from "next/link";
import React, { lazy, Suspense } from "react";

const WorkflowRS = dynamic(() => import("workflowRemote/App"), {
  ssr: false,
});
const example_config = {
  is_allow_download: true,
  download_button_text: "Tải xuống quy trình",
  is_allow_viewfull: true,
  viewfull_button_text: "Xem quy trình",
  common_form_submit_text: "Lưu thông tin quy trình",
  common_form: [
    {
      name: "example_text",
      label: "Example Text",
      input_type: "text",
      col_span: 12,
      placeholder: "Nhập Example text",
      rules: [{ required: true, message: "Vui lòng nhập !" }],
    },
    {
      name: "example_select",
      label: "Example Select",
      input_type: "select",
      col_span: 12,
      placeholder: "Chọn Example Select",
      options: [
        {
          label: "Quy trình 1",
          value: "1",
        },
        {
          label: "Quy trình 2",
          value: "2",
        },
      ],
    },
    {
      name: "example_number",
      label: "Example Number",
      input_type: "number",
      col_span: 6,
      rules: [{ required: true, message: "Vui lòng nhập !" }],
      min: 1,
      max: 10,
    },
    {
      name: "example_radio",
      label: "Example Radio",
      input_type: "radio",
      col_span: 6,
      rules: [{ required: true, message: "Vui lòng nhập !" }],
      // direction: "vertical",
      options: [
        {
          label: "A",
          value: "a",
        },
        {
          label: "B",
          value: "b",
        },
        {
          label: "C",
          value: "c",
        },
      ],
    },
    {
      name: "example_switch",
      label: " ",
      input_label: "Example Switch",
      input_type: "switch",
      col_span: 6,
      defaultChecked: true,
    },
    {
      name: "example_checkbox",
      label: " ",
      input_label: "Example Checkbox",
      input_type: "checkbox",
      col_span: 6,
      defaultChecked: true,
    },
    {
      name: "example_checkbox_group",
      label: "Example Checkbox Group",
      input_type: "checkbox_group",
      col_span: 12,
      rules: [{ required: true, message: "Vui lòng chọn !" }],
      options: [
        {
          label: "Táo",
          value: "tao",
        },
        {
          label: "Đào",
          value: "dao",
        },
        {
          label: "Lê",
          value: "le",
        },
      ],
    },
  ],
  node_form: [
    {
      name: "node_name", // This field is required
      label: "Tên",
      input_type: "text",
      col_span: 12,
      placeholder: "Nhập tên node",
      display_on_node: true,
      primary: true,
      rules: [{ required: true, message: "Vui lòng nhập !" }],
    },
    {
      name: "node_sub_name",
      label: "Tên phụ",
      input_type: "text",
      col_span: 12,
      placeholder: "Nhập tên phụ node",
    },
    {
      name: "node_description",
      label: "Mô tả",
      input_type: "text",
      col_span: 12,
      placeholder: "Mô tả",
      display_on_node: true,
    },
    {
      name: "chosen",
      label: "Quy trình chung",
      input_type: "select",
      col_span: 12,
      placeholder: "Chọn quy trình chung",
      options: [
        {
          label: "Quy trình 1",
          value: "1",
        },
        {
          label: "Quy trình 2",
          value: "2",
        },
      ],
      rules: [{ required: true, message: "Vui lòng chọn !" }],
    },
    {
      name: "condition",
      label: "Condition",
      input_type: "select",
      col_span: 12,
      placeholder: "Chọn quy trình chung",
      options: [
        {
          label: "Code thứ 1",
          value: "1",
        },
        {
          label: "Code thứ 2",
          value: "2",
        },
      ],
    },
  ],
  edge_form: [
    {
      name: "edge_name",
      label: "Tên hành động",
      input_type: "text",
      col_span: 12,
      placeholder: "Nhập tên hành động",
      display_on_edge: true,
      rules: [{ required: true, message: "Vui lòng nhập !" }],
    },
    {
      name: "example_select_1",
      label: "Example Select Field 1",
      input_type: "select",
      col_span: 12,
      placeholder: "Chọn example 1",
      options: [
        {
          label: "option 1",
          value: "1",
        },
        {
          label: "option 2",
          value: "2",
        },
        {
          label: "option 3",
          value: "3",
        },
      ],
      rules: [{ required: true, message: "Vui lòng chọn !" }],
    },
    {
      name: "example_select_2",
      label: "Example Select Field 2",
      input_type: "select",
      col_span: 12,
      placeholder: "Chọn example 2",
      options: [
        {
          label: "option 1",
          value: "1",
        },
        {
          label: "option 2",
          value: "2",
        },
        {
          label: "option 3",
          value: "3",
        },
      ],
      display_on_edge: false,
    },
  ],
};

const WorlflowScreen = () => {
  const handleWorkflowChange = (value) => {
    console.log("value", value);
  };

  const handleSubmitCommonForm = (value) => {
    console.log("value handleSubmitCommonForm", value);
  };
  return (
    <ContentLayout
      title="Tạo mới quy trình"
      breadcrumbItems={[
        {
          title: <Link href={PRIVATE_ROUTE.HOME}>Dashboard</Link>,
        },
        {
          title: "Tạo mới quy trình",
        },
      ]}
    >
      <ContentBody>
        <WorkflowRS
          module_id="flowchart-test"
          config={example_config}
          onWorkflowChange={handleWorkflowChange}
          onSubmitCommonForm={handleSubmitCommonForm}
        />
      </ContentBody>
    </ContentLayout>
  );
};

export default WorlflowScreen;
