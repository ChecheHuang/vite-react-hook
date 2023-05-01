import React from "react";
import { Button, Form, Input } from "antd";
import { QqOutlined, YahooOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { ValidateErrorEntity } from "rc-field-form/lib/interface";
import {
  updateError,
  updateStart,
  updateSuccess,
} from "@/store/modules/tokenSlice";
import { useAppDispatch } from "@/store/hook";
import { login } from "@/api/user";
import { setCookies } from "@/utils/cookies";
const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const onFinish = async (values: { username: string; password: string }) => {
    // console.log("Success:", values);
    try {
      dispatch(updateStart());
      // const data = await login(values);
      const data = await login(values);
      console.log(data);
      const token = data.data.token;
      setCookies("token", token);
      localStorage.setItem("token", token);
      dispatch(updateSuccess(token));
      navigate("/layout/user");
    } catch (err) {
      dispatch(updateError());
      console.error(err);
    }
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "輸入使用者" }]}
        >
          <Input prefix={<QqOutlined />} placeholder="使用者" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "輸入密碼" }]}
        >
          <Input.Password prefix={<YahooOutlined />} placeholder="密碼" />
        </Form.Item>
        <Form.Item>
          <Button block type="primary" htmlType="submit">
            登入
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
