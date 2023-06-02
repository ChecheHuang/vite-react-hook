import Mock from "mockjs";

const route = {
  "/": { label: "首頁", hidden: false, accessRole: ["USER"] },
  "/login": { label: "登入頁", hidden: true, accessRole: ["USER"] },
  "/layout": { label: "控制台", hidden: false, accessRole: ["USER"] },
  "/layout/user": { label: "使用者", hidden: false, accessRole: ["USER"] },
  "/layout/user/user": { label: "user", hidden: false, accessRole: ["USER"] },
  "/layout/home": { label: "home", hidden: false, accessRole: ["USER"] },
};

Mock.mock("/api/route", "post", (options) => {
  const { route } = JSON.parse(options.body);
  console.log(route);
  return {
    code: 200,
    status: "success",
    message: "成功修改",
  };
});

Mock.mock("/api/login", "post", (options) => {
  const { username, password } = JSON.parse(options.body);
  if (username === "qwe" && password === "qwe") {
    return {
      code: 200,
      status: "success",
      data: {
        token: Mock.Random.guid(),
        expireTime: Mock.Random.integer(3600, 7200),
        user: {
          username,
          role: "USER",
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
