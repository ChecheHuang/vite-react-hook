import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "antd";
import type { MenuProps } from "antd";
import { router, RouterItem } from "@/router";
import { useAppSelector } from "@/store/hook";
import { RoleData } from "@/store/modules/tokenSlice";


interface AntdRouterItem  {
  key: string;
  type: string;
  label:string;
  hidden: boolean;
  children?: AntdRouterItem[];
}

const storageSelectKeys = JSON.parse(
  sessionStorage.getItem("selectKeys") || "[]"
);
const storageOpenKeys = JSON.parse(sessionStorage.getItem("openKeys") || "[]");
function Aside() {
  const { user, route: accessRoute = {} } = useAppSelector(
    (state) => state.token
  );
  const [routerItem, setRouterItem] = useState<AntdRouterItem[]>([]);
  const [selectKeys, setSelectKeys] = useState<string[]>(storageSelectKeys);
  const [openKeys, setOpenKeys] = useState<string[]>(storageOpenKeys);
  const navigate = useNavigate();

  useEffect(() => {
    if(!user)return
    setRouterItem(convertRouter(router, accessRoute, user.role));
  }, [user, accessRoute]);

  const handleLink: MenuProps["onClick"] = (e) => {
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
        items={routerItem}
      />
    </>
  );
}

export default Aside;

function convertRouter(
  config: RouterItem[],
  accessRoute: RoleData,
  role: "ADMIN" | "USER",
  parentKey = ""
): AntdRouterItem[] {
  return config.reduce((result: AntdRouterItem[], item: RouterItem) => {
    const key = parentKey ? `${parentKey}/${item.path}` : item.path;
    const hidden =
      item.hidden ||
      accessRoute[key]?.hidden ||
      !accessRoute[key]?.accessRole?.includes(role);

    if (hidden) {
      // 如果項目被標記為隱藏，則不包含它
      return result;
    }

    const newItem: AntdRouterItem = {
      key,
      type: "",
      hidden,
      label: item.label,
    };

    if (item.children) {
      newItem.children = convertRouter(item.children, accessRoute, role, key);
    }

    result.push(newItem);

    return result;
  }, []);
}

