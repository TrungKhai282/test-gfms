import * as yup from "yup";

export const getValidateRules = (schema: yup.ObjectSchema<any>) => {
  return {
    async validator({ field }: any, value: any) {
      await schema.validateSyncAt(field, { [field]: value });
    },
  };
};
