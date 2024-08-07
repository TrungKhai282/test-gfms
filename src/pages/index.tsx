import Loading from "@/common/Suspense";
import LazyComponent from "@/common/lazy-component";
import dynamic from "next/dynamic";
import Head from "next/head";

const DashboardScreen = dynamic(() => import("@/components/dashboard"), {
  loading: () => <Loading />,
});

const Page = () => {
  return (
    <LazyComponent>
      <Head>
        <title>Dashboard</title>
        <meta name="view-transition" content="same-origin" />
      </Head>
      <DashboardScreen />
    </LazyComponent>
  );
};

export default Page;
