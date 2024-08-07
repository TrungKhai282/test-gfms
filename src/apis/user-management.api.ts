import service from "./service";

export const getUserList = async (params: any) => {
  const endpoint = "/services/msplogistic/users";
  const response = await service({
    method: "get",
    url: endpoint,
    params: params,
  });
  return response;
};

export const getUserDetail = async (id: string | number) => {
  const endpoint = `/services/msplogistic/users/${id}`;
  const response = await service({
    method: "get",
    url: endpoint,
  });
  return response;
};

export const postCreateUser = async (data: any) => {
  const endpoint = "/services/msplogistic/users";
  const response = await service({
    method: "post",
    url: endpoint,
    data,
  });
  return response;
};

export const putUpdateUser = async ({
  id,
  data,
}: {
  id: string | number;
  data: any;
}) => {
  const endpoint = `/services/msplogistic/users/${id}`;
  const response = await service({
    method: "put",
    url: endpoint,
    data,
  });
  return response;
};

export const deleteUser = async (id: string | number) => {
  const endpoint = `/services/msplogistic/users/${id}`;
  const response = await service({
    method: "delete",
    url: endpoint,
  });
  return response;
};

export const getDefaultRole = async () => {
  const endpoint = "/services/msplogistic/users/default-roles";
  const response = await service({
    method: "get",
    url: endpoint,
  });
  return response;
};
