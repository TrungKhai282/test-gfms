import Loading from "@/common/Suspense";
import LazyComponent from "@/common/lazy-component";
import dynamic from "next/dynamic";
import Head from "next/head";

const NotExistScreen = dynamic(() => import("@/components/404"), {
  loading: () => <Loading />,
});

const Page = () => {
  return (
    <LazyComponent>
      <Head>
        <title>Not found!</title>
        <meta name="view-transition" content="same-origin" />
      </Head>
      <NotExistScreen />
    </LazyComponent>
  );
};

export default Page;
