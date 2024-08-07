import React from "react";

const LazyComponent = ({ children }) => {
  return <div className="lazy-component fadeIn">{children}</div>;
};

export default LazyComponent;
