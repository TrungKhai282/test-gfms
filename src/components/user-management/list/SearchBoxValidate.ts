import * as yup from "yup";
import { getValidateRules } from "@/common/utils/form.util";
import { SearchBoxFormType } from "../common/type";

let schema: yup.ObjectSchema<SearchBoxFormType> = yup.object().shape({
  loginName: yup.string(),
  userName: yup.string(),
  status: yup.string(),
  creater: yup.string(),
  create_date: yup.array().of(yup.string().nullable()).min(0).nullable(),
  updater: yup.string(),
  update_date: yup.array().of(yup.string().nullable()).min(0).nullable(),
});

export const rules = getValidateRules(schema);
