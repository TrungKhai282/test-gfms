import service from "./service";

export const getMenu = async () => {
  const getMenuEnpoint = `/${process.env.NEXT_PUBLIC_APP_API_MSCSM}/api/menu/getMenu`;
  const response = await service({
    url: getMenuEnpoint,
    method: "GET",
  });
  return response;
};
