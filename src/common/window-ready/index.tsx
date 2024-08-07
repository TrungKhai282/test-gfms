import React, { useEffect, useLayoutEffect, useState } from "react";
import LoadingFallback from "./Loading";
import style from "./style.module.scss";

type FallbackPropsType = {
  children: React.ReactNode;
};

function WindowReady({ children }: FallbackPropsType) {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setShouldRender(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return shouldRender && children;
}

export default WindowReady;
