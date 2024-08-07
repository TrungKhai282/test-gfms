import Loading from "@/common/Suspense";
import LazyComponent from "@/common/lazy-component";
import dynamic from "next/dynamic";
import Head from "next/head";

const WorkflowCreate = dynamic(() => import("@/components/workflow/create"), {
  loading: () => <Loading />,
});

const Page = (props) => {
  return (
    <LazyComponent>
      <Head>
        <title>Create Workflow</title>
        <meta name="view-transition" content="same-origin" />
      </Head>
      <WorkflowCreate />
    </LazyComponent>
  );
};
export default Page;
