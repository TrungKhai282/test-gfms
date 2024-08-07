declare module "workflowRemote/App" {
  import React from "react";
  type PropsType = {
    module_id: string;
    config: any;
    onWorkflowChange?: (state: any)=>void
    onSubmitCommonForm?: (state: any)=>void
  };
  const App: React.FunctionComponent<PropsType>;
  export default App;
}
