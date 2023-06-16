import { Button } from "antd";
import { PoweroffOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useAppDispatch } from "@/store/hook";
import { updateSuccess } from "@/store/modules/tokenSlice";
import { useAppSelector } from "@/store/hook";

const Header = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.token);

  const logout = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      localStorage.clear();
      dispatch(updateSuccess({token: undefined}));
    }, 1000);
  };
  return (
    <header>
      <div>身分是{user?.role}</div>
      <Button
        // className="mybtn"
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
