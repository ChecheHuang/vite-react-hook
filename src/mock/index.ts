import Mock from "mockjs";

const route: { [key: string]: any } = {
  "/": { accessRole: ["ADMIN", "USER"] },
  "/login": { accessRole: ["ADMIN", "USER"] },
  "/layout": { accessRole: ["ADMIN", "USER"] },
  "/layout/user": { accessRole: ["ADMIN", "USER"] },
  "/layout/user/user": { accessRole: ["ADMIN", "USER"] },
  "/layout/home": { accessRole: ["ADMIN", "USER"] },
  "/control": { accessRole: ["ADMIN"] },
  "/control/handle": { accessRole: ["ADMIN"] },
  "/control/show": { accessRole: ["ADMIN"] },
};

Mock.mock("/api/route", "post", (options) => {
  const { path, user, control } = JSON.parse(options.body);
  if (control) {
    route[path]["accessRole"].push(user);
  } else {
    route[path]["accessRole"] = route[path]["accessRole"].filter(
      (item: string) => item !== user
    );
  }
  localStorage.setItem("Mock", JSON.stringify(route));
  return {
    code: 200,
    status: "success",
    message: "成功修改",
    route,
  };
});

Mock.mock("/api/login", "post", (options) => {
  const { username, password } = JSON.parse(options.body);
  if (username && password) {
    return {
      code: 200,
      status: "success",
      data: {
        token: Mock.Random.guid(),
        expireTime: Mock.Random.integer(3600, 7200),
        user: {
          username,
          role: username.toUpperCase(),
        },
        route,
      },
      message: "登入成功",
    };
  } else {
    return {
      code: 401,
      status: "error",
      message: "帳號或密碼錯誤",
    };
  }
});

Mock.mock("/api/users", "get", {
  "users|10": [
    {
      "id|+1": 1,
      name: "@cname",
      "age|18-60": 1,
      email: "@email",
      avatar: "@image(100x100)",
    },
  ],
});
