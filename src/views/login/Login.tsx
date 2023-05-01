import React from "react";
import "./login.scss";
import Form from "./components/Form";
const Login: React.FC = () => {
  return (
    <div className="login-container">
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
