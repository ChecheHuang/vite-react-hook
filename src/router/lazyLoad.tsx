import React, { Suspense } from "react";

function lazyLoad(Comp: React.LazyExoticComponent<()=>JSX.Element>) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Comp />
    </Suspense>
  );
}

export default lazyLoad;
