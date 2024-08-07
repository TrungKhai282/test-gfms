import Loading from "@/common/Suspense";
import LazyComponent from "@/common/lazy-component";
import dynamic from "next/dynamic";
import Head from "next/head";
const ListUserScreen = dynamic(
  () => import("@/components/user-management/list"),
  {
    loading: () => <Loading />,
  }
);

const Page = (props) => {
  return (
    <LazyComponent>
      <Head>
        <title>List User</title>
        <meta name="view-transition" content="same-origin" />
      </Head>
      <ListUserScreen />
    </LazyComponent>
  );
};
export default Page;
