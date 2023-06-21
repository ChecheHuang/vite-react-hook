import React from "react";
import styles from "./login.module.scss";
import Form from "./components/Form.tsx";
import MyButton, { Request } from "@/components/Button";

const Login: React.FC = () => {
  const request: Request = {
    url: "/test",
    method: "post",
    data: {},
  };

  const handleClick = (result: object, error?: Error): void => {
    if (error) {
      console.error(error);
    } else {
      console.log("result", result);
    }
  };

  return (
    <div className={styles.loginContainer}>
      {/* <MyButton request={request} onClick={handleClick} /> */}
      <div className={styles.loginWrap}>
        <div className={styles.loginForm}>
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
