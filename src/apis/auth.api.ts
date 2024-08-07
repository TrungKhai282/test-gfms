import axios from "axios";
import service from "./service";
import { SESSION } from "@/common/contants/auth.constant";
import { setCookie } from "cookies-next";

export type payloadLogin = {
  username: string;
  password: string;
  rememberMe: boolean;
};

export const loginCrm = async (payload: payloadLogin) => {
  const response = await axios({
    url: "/api/login-crm",
    method: "post",
    data: {
      form: payload,
      metadata: {
        userAgent: navigator.userAgent,
        language: navigator.language,
        platform: navigator.platform,
      },
    },
  });
  return response;
};

export const logoutCrm = async () => {
  const response = await axios({
    url: "/api/logout-crm",
    method: "get",
  });
  return response;
};

export const refeshSessionCRM = async () => {
  const response = await axios({
    url: "/api/refesh-session",
    method: "get",
  });
  if (response.status === 200) {
    setCookie(SESSION, response.data.token, {
      path: "/",
      secure: process.env.NODE_ENV === "production",
    });
  }

  return response;
};

export const getProfile = async () => {
  const endPoint = `/services/msplogistic/my/profile`;
  const response = await service({
    url: endPoint,
    method: "get",
  });
  return response;
};
