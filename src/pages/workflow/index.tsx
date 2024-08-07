import Loading from "@/common/Suspense";
import LazyComponent from "@/common/lazy-component";
import dynamic from "next/dynamic";
import Head from "next/head";

const WorkflowManager = dynamic(() => import("@/components/workflow"), {
  loading: () => <Loading />,
});

const Page = (props) => {
  return (
    <LazyComponent>
      <Head>
        <title>Workflow</title>
        <meta name="view-transition" content="same-origin" />
      </Head>
      <WorkflowManager />
    </LazyComponent>
  );
};
export default Page;
