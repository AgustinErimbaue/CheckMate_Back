const request = require("supertest");
const app = require("../index");
const Task = require("../models/Tasks");
const User = require("../models/User");

describe("testing/tasks", () => {
  const task = {
    title: "Test Task",
    description: "This is a test task",
    completed: false,
    userId: "683ed2ab99021071cf306eb1",
  };

  let token;

  beforeEach(async () => {
    await Task.deleteMany({});
    await User.deleteMany({});
    await request(app).post("/user/create").send({
      username: "TestUser",
      email: "test123@gmail.com",
      password: "test123",
      confirmPassword: "test123",
    });
    const loginRes = await request(app)
      .post("/user/login")
      .send({ email: "test123@gmail.com", password: "test123" });
    token = loginRes.body.token;
  });

  test("Create a task", async () => {
    let tasksCount = await Task.countDocuments({});
    expect(tasksCount).toBe(0);

    const resTask = await request(app)
      .post("/task/create")
      .set("Authorization", `${token}`)
      .send({
        title: "Test Task",
        description: "This is a test task",
        completed: false,
      })
      .expect(201);

    tasksCount = await Task.countDocuments({});
    expect(tasksCount).toBe(1);
    expect(resTask.body.task._id).toBeDefined();
  });
});
