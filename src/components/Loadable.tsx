import { Spin, Progress } from "antd";
import { FC, useEffect, useState } from "react";
import styled from "@emotion/styled";

type LoadableProps = {
  comp: React.LazyExoticComponent<() => JSX.Element>;
  fallback?: JSX.Element;
};

const LoaderWrapper = styled("div")({
  position: "fixed",
  top: 0,
  left: 0,
  zIndex: 1301,
  width: "100%",
});

const Loadable: FC<LoadableProps> = ({
  comp: Component,
  fallback = null,
  ...rest
}) => {
  const [loadingProgress, setLoadingProgress] = useState<number>(0);

  useEffect(() => {
    const resources = performance.getEntriesByType(
      "resource"
    ) as PerformanceResourceTiming[];

    let loadedSize = 0;
    const updateLoadingProgress = () => {
      loadedSize += 1;
      const progress = Math.floor((loadedSize / resources.length) * 100);
      setLoadingProgress(progress);
    };

    resources.forEach((resource) => {
      if (resource.transferSize > 0) {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", resource.name, true);
        xhr.onload = updateLoadingProgress;
        xhr.send();
      } else {
        loadedSize += 1;
      }
    });

    return () => {
      resources.forEach((resource) => {
        if (resource.transferSize > 0) {
          const xhr = new XMLHttpRequest();
          xhr.open("GET", resource.name, true);
          xhr.onload = null;
          xhr.abort();
        }
      });
    };
  }, []);

  const LoadedComponent = Component;

  return (
    <LoaderWrapper>
      <Spin spinning={loadingProgress < 100} tip="Loading...">
        {loadingProgress < 100 ? (
          <Progress percent={loadingProgress} status="active" />
        ) : (
          <LoadedComponent {...rest} />
        )}
      </Spin>
    </LoaderWrapper>
  );
};

export default Loadable;
