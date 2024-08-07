import { PUBLIC_ROUTE } from "@/common/routers";
import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from "@/common/utils/storage.util";
import {
  AUTH_TOKEN,
  IS_REFRESH,
  SESSION,
} from "@/common/contants/auth.constant";
import axios, { AxiosInstance } from "axios";
import { getCookie, deleteCookie } from "cookies-next";
import { logoutCrm } from "./auth.api";

const service: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DEFAULT_API_PREFIX,
  timeout: 8000,
});
// API Request interceptor
service.interceptors.request.use(
  async (config) => {
    const token = await getCookie(SESSION);
    const authorization = "Bearer " + token;
    if (!config.headers["Authorization"] && authorization) {
      await config.headers.setAuthorization(authorization);
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

service.interceptors.response.use(
  async (response) => {
    const is_refresh = await getLocalStorage(IS_REFRESH);
    if (is_refresh && JSON.parse(is_refresh)) {
      await removeLocalStorage(IS_REFRESH);
    }
    return response;
  },
  async (error) => {
    let notificationParam = {
      message: "",
      description: "",
    };
    const statusCode = error?.response?.status || 0;
    const is_refresh = await getLocalStorage(IS_REFRESH);

    // Remove token and redirect
    if (statusCode === 400 || statusCode === 403 || statusCode === 401) {
      notificationParam.message = "Authentication Fail";
      notificationParam.description = "Please login again";

      if (is_refresh && JSON.parse(is_refresh)) {
        await removeLocalStorage(IS_REFRESH);
        await logoutCrm();
        deleteCookie(SESSION);
        window.location.reload();
      } else {
        await setLocalStorage(IS_REFRESH, JSON.stringify(true));
      }
    }

    if (statusCode === 404) {
      notificationParam.message = "Not Found";
    }

    if (statusCode === 500) {
      notificationParam.message = "Internal Server Error";
    }

    if (statusCode === 508) {
      notificationParam.message = "Time Out";
    }
    return Promise.reject(error);
  }
);

export default service;
