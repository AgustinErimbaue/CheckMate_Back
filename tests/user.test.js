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
