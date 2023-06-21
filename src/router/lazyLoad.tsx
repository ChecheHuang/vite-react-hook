import React, { Suspense } from "react";
import Loader from "./Loader";

function lazyLoad(
  ComponentPromise: Promise<{ default: React.ComponentType<object> }>
) {
  const LazyComponent = React.lazy(() => ComponentPromise);

  return (
    <Suspense fallback={<Loader />}>
      {/* <Loader /> */}
      <LazyComponent />
    </Suspense>
  );
}

export default lazyLoad;
