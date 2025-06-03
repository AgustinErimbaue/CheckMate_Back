const request = require("supertest");
const app = require("../index");
const User = require("../models/User");

describe("testing/users", () => {
  const user = {
    username: "TestUser",
    email: "test123@gmail.com",
    password: "test123",
    confirmPassword: "test123",
  };

  beforeEach(async () => {
    await User.deleteMany({});
  });

  test("Create a user", async () => {
    let usersCount = await User.countDocuments({});
    expect(usersCount).toBe(0);

    const resUser = await request(app).post("/user/create").send(user).expect(201);

    usersCount = await User.countDocuments({});
    expect(usersCount).toBe(1);

    console.log("_id:", resUser.body.user._id);
    console.log("createdAt:", resUser.body.user.createdAt);
    console.log("updatedAt:", resUser.body.user.updatedAt);

    expect(resUser.body.user._id).toBeDefined();
    expect(resUser.body.user.createdAt).toBeDefined();
    expect(resUser.body.user.updatedAt).toBeDefined();
  });
});


describe("testing/login", () => {
  const user = {
    username: "TestUser",
    email: "test123@gmail.com",
    password: "test123",
    confirmPassword: "test123",
  };

  beforeEach(async () => {
    await User.deleteMany({});
    await request(app).post("/user/create").send(user);
  });

  test("Login a user", async () => {
    const res = await request(app)
      .post("/user/login")
      .send({ email: user.email, password: user.password })
      .expect(200);

    expect(res.body).toHaveProperty("token");
    expect(res.body.message).toContain("Bienvenid@");
    console.log("Token recibido:", res.body.token);
  });
});

describe("testing/logout", () => {
  const user = {
    username: "TestUser",
    email: "test123@gmail.com",
    password: "test123",
    confirmPassword: "test123",
  };

  beforeEach(async () => {
    await User.deleteMany({});
    await request(app).post("/user/create").send(user);
  });

  test("Logout a user", async () => {
     // 1. Login para obtener el token
    const loginRes = await request(app)
      .post("/user/login")
      .send({ email: user.email, password: user.password })
      .expect(200);

       const token = loginRes.body.token;
    expect(token).toBeDefined();

    // 2. Hacer logout usando el token
    const logoutRes = await request(app)
      .delete("/user/logout")
      .set("Authorization", `${token}`)
      .expect(200);

    expect(logoutRes.body.message).toMatch(/Desconectado con éxito|success/i);
    console.log("Logout:", logoutRes.body.message);
  });
});
