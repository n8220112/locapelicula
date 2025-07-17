import React from "react";
import {BarLoader} from "react-spinners";

const LoadingBar = () => {
  return (
    <div className="loading-bar">
      <BarLoader className="loader" />
    </div>
  );
};

export default LoadingBar;
