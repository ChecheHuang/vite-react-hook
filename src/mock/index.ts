import Mock from "mockjs";

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
Mock.mock("/api/login", "post", (options) => {
  const { username, password } = JSON.parse(options.body);
  if (username === "qwe" && password === "qwe") {
    return {
      code: 200,
      status: "success",
      data: {
        token: Mock.Random.guid(),
        expireTime: Mock.Random.integer(3600, 7200),
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
Mock.mock("/api/test", "post", (options) => {
  return {
    code: 401,
    status: "error",
    message: "帳號或密碼錯誤",
  };
  return {
    status: "success",
    message: "測試成功",
  };
});
