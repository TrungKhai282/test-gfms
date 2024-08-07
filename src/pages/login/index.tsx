import Loading from "@/common/Suspense";
import LazyComponent from "@/common/lazy-component";
import dynamic from "next/dynamic";
import Head from "next/head";
const LoginScreen = dynamic(() => import("@/components/login"), {
  loading: () => <Loading />,
});
const Page = () => {
  return (
    <LazyComponent>
      <Head>
        <title>Login</title>
        <meta name="view-transition" content="same-origin" />
      </Head>
      <LoginScreen />
    </LazyComponent>
  );
};

export default Page;
