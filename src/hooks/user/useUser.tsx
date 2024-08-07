import { useMutation, useQuery } from "@tanstack/react-query";
import {
  deleteUser,
  getDefaultRole,
  getUserDetail,
  getUserList,
  postCreateUser,
  putUpdateUser,
} from "@/apis/user-management.api";
import { openNotification } from "@/common/notification";

export const userListQuery = (params: any) => {
  return useQuery({
    queryKey: ["user-list", params],
    queryFn: () => {
      return getUserList(params);
    },
    retry: 1,
    refetchOnWindowFocus: false,
    retryOnMount: false,
    enabled: false,
    select: (res) => {
      const { data } = res;
      return {
        items: data.items || [],
      };
    },
  });
};
export const userDetail = (id) => {
  return useQuery({
    queryKey: ["user-detail", id],
    queryFn: () => {
      return getUserDetail(id);
    },
    retry: 1,
    refetchOnWindowFocus: false,
    retryOnMount: false,
    enabled: false,
    select: (res) => {
      const { data } = res;
      return data || {};
    },
  });
};

export const defaultRoleQuery = () => {
  return useQuery({
    queryKey: ["default-roles"],
    queryFn: () => {
      return getDefaultRole();
    },
    retry: 1,
    refetchOnWindowFocus: false,
    retryOnMount: false,
    enabled: false,
    initialData: Object({}),
    select: (res) => {
      const { data } = res;
      return {
        items: data || [],
      };
    },
  });
};

export const createUser = (onSuccess?: Function, onError?: Function) => {
  return useMutation({
    mutationFn: postCreateUser,
    retry: 1,
    onSuccess(data, variables, context) {
      openNotification({
        type: "success",
        title: "Thêm mới thành công",
        message: "Đã thêm mới người dùng thành công",
      });

      if (typeof onSuccess === "function") {
        onSuccess(data);
      }
    },
    onError(error, variables, context) {
      openNotification({
        type: "error",
        title: "Thêm mới thất bại",
        message: "Đã có vấn đề xảy ra, vui lòng thử lại sau",
      });

      if (typeof onError === "function") {
        onError(error);
      }
    },
  });
};

export const updateUser = (onSuccess?: Function, onError?: Function) => {
  return useMutation({
    mutationFn: putUpdateUser,
    retry: 1,
    onSuccess(data, variables, context) {
      openNotification({
        type: "success",
        title: "Cập nhật thành công",
        message: "Đã Cập nhật người dùng thành công",
      });

      if (typeof onSuccess === "function") {
        onSuccess(data);
      }
    },
    onError(error, variables, context) {
      openNotification({
        type: "error",
        title: "Cập nhật thất bại",
        message: "Đã có vấn đề xảy ra, vui lòng thử lại sau",
      });

      if (typeof onError === "function") {
        onError(error);
      }
    },
  });
};

export const unActiveUser = (onSuccess?: Function, onError?: Function) => {
  return useMutation({
    mutationFn: deleteUser,
    retry: 1,
    onSuccess(data, variables, context) {
      openNotification({
        type: "success",
        title: "Cập nhật thành công",
        message: "Đã Cập nhật người dùng thành công",
      });

      if (typeof onSuccess === "function") {
        onSuccess(data);
      }
    },
    onError(error, variables, context) {
      openNotification({
        type: "error",
        title: "Cập nhật thất bại",
        message: "Đã có vấn đề xảy ra, vui lòng thử lại sau",
      });

      if (typeof onError === "function") {
        onError(error);
      }
    },
  });
};
