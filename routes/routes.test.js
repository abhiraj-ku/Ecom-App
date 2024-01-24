const request = require("supertest");
const express = require("express");
const router = require("./your-router-file"); // Replace with the actual file path

const app = express();
app.use(express.json());
app.use("/api", router); // Replace '/api' with your actual route prefix

describe("POST /api/signup", () => {
  it("should respond with status 200 and a success message", async () => {
    const response = await request(app).post("/api/signup").send({
      // Provide necessary request payload for testing
      username: "testuser",
      password: "testpassword",
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      success: true,
      message: "Signup successful",
    });
  });
});

describe("POST /api/login", () => {
  it("should respond with status 200 and a success message", async () => {
    const response = await request(app).post("/api/login").send({
      // Provide necessary request payload for testing
      username: "testuser",
      password: "testpassword",
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      success: true,
      message: "Login successful",
    });
  });
});
