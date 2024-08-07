import { payloadLogin, loginCrm, logoutCrm, getProfile } from "@/apis/auth.api";
import { PRIVATE_ROUTE } from "@/common/routers";
import { useMutation, useQuery } from "@tanstack/react-query";
import { openNotification } from "@/common/notification";
import { deleteCookie } from "cookies-next";
import { SESSION } from "@/common/contants/auth.constant";

const useAuth = () => {
  const login = useMutation({
    mutationFn: (payload: payloadLogin) => {
      return loginCrm(payload);
    },
    onSuccess: (res) => {
      if (res.status === 200) {
        openNotification({
          type: "success",
          title: res.data?.message?.vn || "",
          message: res.data?.description?.vn || "",
        });

        window.location.replace(PRIVATE_ROUTE.HOME);
      }
    },
    onError: (Err: any) => {
      openNotification({
        type: "error",
        title: Err.response?.data?.message?.vn || "",
        message: Err.response?.data?.description?.vn || "",
        duration: 4,
      });
    },
  });

  const logout = useMutation({
    mutationFn: logoutCrm,
    onSuccess: (res) => {
      if (res.status === 200) {
        openNotification({
          type: "success",
          title: res.data?.message?.vn || "",
          message: res.data?.description?.vn || "",
          duration: 1,
        });
        deleteCookie(SESSION);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    },
    onError: (Err: any) => {
      openNotification({
        type: "error",
        title: Err.response?.data?.message?.vn || "",
        message: Err.response?.data?.description?.vn || "",
      });
    },
  });

  const profileQuery = () => {
    return useQuery({
      queryKey: ["profile-detail"],
      queryFn: () => {
        return getProfile();
      },
      retry: 1,
      refetchOnWindowFocus: false,
      retryOnMount: false,
      enabled: false,
      select: (res) => {
        const { data } = res;
        return data;
      },
    });
  };

  return {
    login,
    logout,
    profileQuery,
  };
};

export default useAuth;
