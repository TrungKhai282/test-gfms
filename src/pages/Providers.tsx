import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { ConfigProvider, ThemeConfig } from "antd";

type PropTypes = {
  children: React.ReactNode;
  themConfig: ThemeConfig;
};

import "@tanstack/react-query";
import { AxiosError } from "axios";
import useThemeConfig from "@/common/styles/useThemeConfig";
import { getLocalStorage } from "@/common/utils/storage.util";
import { IS_REFRESH } from "@/common/contants/auth.constant";
import { refeshSessionCRM } from "@/apis/auth.api";

declare module "@tanstack/react-query" {
  interface Register {
    defaultError: AxiosError;
  }
}

export default function Providers({ children, themConfig }: PropTypes) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1,
            retryDelay: (attemptIndex) => {
              const is_refresh = getLocalStorage(IS_REFRESH);

              if (is_refresh && JSON.parse(is_refresh)) {
                refeshSessionCRM();
                return 3000;
              }

              return Math.min(2000 * 2 ** attemptIndex, 30000);
            },
          },
          mutations: {
            retry: 1,
            retryDelay: (attemptIndex) => {
              const is_refresh = getLocalStorage(IS_REFRESH);

              if (is_refresh && JSON.parse(is_refresh)) {
                refeshSessionCRM();
                return 3000;
              }

              return Math.min(2000 * 2 ** attemptIndex, 30000);
            },
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider theme={themConfig}>{children}</ConfigProvider>
    </QueryClientProvider>
  );
}
