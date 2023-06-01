import { Button } from "antd";
import { PoweroffOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useAppDispatch } from "@/store/hook";
import { useNavigate } from "react-router-dom";
import { updateSuccess } from "@/store/modules/tokenSlice";
import styles from "./header.module.scss";
const Header = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logout = () => {
    setIsLoading(true);
    localStorage.clear();
    dispatch(updateSuccess(""));
    setTimeout(() => {
      setIsLoading(false);
      navigate("/login");
    }, 2000);
  };
  return (
    <header className={styles.header}>
      <div>header</div>
      <Button
        type="primary"
        icon={<PoweroffOutlined />}
        loading={isLoading}
        onClick={logout}
      >
        登出
      </Button>
    </header>
  );
};

export default Header;
