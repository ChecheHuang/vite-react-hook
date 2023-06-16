import { Progress } from "antd";
import styled from "@emotion/styled";

const LoaderWrapper = styled("div")({
  position: "fixed",
  top: -10,
  left: 0,
  zIndex: 1301,
  width: "100%",
});

const Loader = () => {
  return (
    <LoaderWrapper>
      <Progress
        percent={100}
        status="active"
        type="line"
        strokeColor={{ from: "#108ee9", to: "#87d068" }}
        showInfo={false}
      />
    </LoaderWrapper>
  );
};

export default Loader;
