import React from "react";
import { useState } from "react";

const Loading = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={isLoading ? "load-div" : "hidden"}>
      <div className={isLoading ? "loading" : "hidden"}></div>

      {setTimeout(() => {
        setIsLoading(false);
      }, 8000)}
    </div>
  );
};

export default Loading;
