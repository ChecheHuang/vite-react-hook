import React from "react";
import "./login.scss";
import Form from "./components/Form.tsx";
import MyButton, { Request } from "@/components/Button";

const Login: React.FC = () => {
  const request: Request = {
    url: "/test",
    method: "post",
  };

  const handleClick = (result: object, error?: Error): void => {
    if (error) {
      console.error(error);
    } else {
      console.log("result", result);
    }
  };

  return (
    <div className="login-container">
      {/* <MyButton request={request} onClick={handleClick} /> */}
      <div className="login-wrap">
        <div className="login-form">
          <img
            src="https://www.brandinlabs.com/wp-content/uploads/2014/11/Pizza_Hut_logo.svg_.png"
            alt=""
          />
          <h1>React+Hook Admin</h1>
          <Form />
        </div>
      </div>
    </div>
  );
};

export default Login;
