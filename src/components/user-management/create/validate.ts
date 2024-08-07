import * as yup from "yup";
import { getValidateRules } from "@/common/utils/form.util";
import { CreateFormType } from "../common/type";

let schema: yup.ObjectSchema<CreateFormType> = yup.object().shape({
  phone: yup.string(),
  display_name: yup.string().required("Vui lòng nhập tên"),
  email: yup
    .string()
    .required("Vui lòng nhập email")
    .email("Email không hợp lệ"),
  username: yup.string().required(),
  roles: yup
    .array()
    .min(1, "Vui lòng chọn ít nhất 1 vai trò")
    .of(yup.string().required("Vui lòng chọn vai trò"))
    .required("Vui lòng chọn vai trò"),
});

export const rules = getValidateRules(schema);
