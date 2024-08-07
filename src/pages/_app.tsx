import type { AppProps } from "next/app";
import Providers from "./Providers";
import Layout from "@/common/crm-layout";
import { PRIVATE_ROUTE } from "@/common/routers";
import WindowReady from "@/common/window-ready";
import TopLoader from "@/common/top-loader";
import "@/common/styles/global.scss";
import "@/common/styles/animate.scss";
import useThemeConfig from "@/common/styles/useThemeConfig";

export default function MyApp(myAppProps: AppProps) {
  const { Component, pageProps, router } = myAppProps;
  const isPrivateRouter = Object.values(PRIVATE_ROUTE).includes(
    router.pathname
  );
  const { themConfig } = useThemeConfig();
  return (
    <>
      <WindowReady>
        {isPrivateRouter ? (
          <Providers themConfig={themConfig}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </Providers>
        ) : (
          <Providers themConfig={{}}>
            <Component {...pageProps} />
          </Providers>
        )}
      </WindowReady>
      <TopLoader />
    </>
  );
}
