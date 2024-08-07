import Loading from "@/common/Suspense";
import LazyComponent from "@/common/lazy-component";
import dynamic from "next/dynamic";
import Head from "next/head";
const CreateUserScreen = dynamic(
  () => import("@/components/user-management/create"),
  {
    loading: () => <Loading />,
  }
);
const Page = () => {
  return (
    <LazyComponent>
      <Head>
        <title>Create User</title>
        <meta name="view-transition" content="same-origin" />
      </Head>
      <CreateUserScreen />
    </LazyComponent>
  );
};

export default Page;
