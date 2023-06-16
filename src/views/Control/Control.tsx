import { useAppSelector, useAppDispatch } from "@/store/hook";
import { Switch } from "antd";
import axios from "axios";
import { useMemo } from "react";
import { updateRoute } from "@/store/modules/tokenSlice";

const Control: React.FC = () => {
  const { route = {} } = useAppSelector((state) => state.token);
  const dispatch = useAppDispatch();

  //  console.log(route);

  const arr = useMemo(() => {
    return Object.entries(route).map((item) => {
      const key = item[0];
      const newItem: Record<string, any> = {};
      newItem["key"] = key;
      newItem["accessRole"] = item[1]["accessRole"];
      return newItem;
    });
  }, [route]);

  const handleChange = (path: string, user: string, control: boolean) => {
    const data = {path,user,control}
    // console.log(data)
     axios.post("/api/route", data).then((res) => {
      const {route} = res.data
       dispatch(updateRoute(route));
     });


  };

  return (
    <div className="p-10 flex flex-col gap-3">
      {arr.map((item) => {
        return (
          <div className="flex w-full justify-between" key={item.key}>
            <div>{item.key}</div>
            <div>
              <label>ADMIN</label>
              <Switch
                checkedChildren="開啟"
                unCheckedChildren="關閉"
                checked={item.accessRole.includes("ADMIN")}
                onChange={() => {
                  handleChange(
                    item.key,
                    "ADMIN",
                    !item.accessRole.includes("ADMIN")
                  );
                }}
              />
              <label>USER</label>
              <Switch
                checkedChildren="開啟"
                unCheckedChildren="關閉"
                checked={item.accessRole.includes("USER")}
                onChange={() => {
                  handleChange(
                    item.key,
                    "USER",
                    !item.accessRole.includes("USER")
                  );
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Control;
