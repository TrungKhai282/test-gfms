import { useQuery } from "@tanstack/react-query";
import { getMenu } from "@/apis/menu.api";

export const menuQuery = () => {
  return useQuery({
    queryKey: ["get-menu"],
    queryFn: getMenu,
    retry: 1,
    refetchOnWindowFocus: false,
    retryOnMount: false,
    enabled: true,
    select: (res) => {
      return {
        items: res?.data?.data || [],
      };
    },
  });
};
