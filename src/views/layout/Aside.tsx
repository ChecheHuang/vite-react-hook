import { useState } from "react";
import { router_item, AntdRouterItem } from "@/router";
import { useNavigate } from "react-router-dom";
import { Menu } from "antd";
import type { MenuProps } from "antd";
const storageSelectKeys = JSON.parse(
  sessionStorage.getItem("selectKeys") || "[]"
);
const storageOpenKeys = JSON.parse(
  sessionStorage.getItem("openKeys") || "[]"
);
// console.log(JSON.stringify(router_item));
function Aside() {
  const [router] = useState<AntdRouterItem[]>(router_item);
  const [selectKeys, setSelectKeys] = useState<string[]>(storageSelectKeys);
  const [openKeys, setOpenKeys] = useState<string[]>(storageOpenKeys);
  const navigate = useNavigate();
  const handleLink: MenuProps["onClick"] = (e) => {
    console.log(e);
    navigate(e.key);
    sessionStorage.setItem("selectKeys", JSON.stringify(e.keyPath));
    setSelectKeys(e.keyPath as string[]);
  };
  const handleSubMenu = (openKeys: string[]) => {
    sessionStorage.setItem("openKeys", JSON.stringify(openKeys));
    setOpenKeys(openKeys);
  };
  return (
    <>
      <Menu
        onClick={handleLink}
        onOpenChange={handleSubMenu}
        mode="inline"
        theme="dark"
        defaultSelectedKeys={selectKeys}
        defaultOpenKeys={openKeys}
        items={router}
      />
    </>
  );
}

export default Aside;
