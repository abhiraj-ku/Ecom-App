const request = require("supertest");
const express = require("express");
const router = require("./your-router-file"); // Replace with the actual file path

const app = express();
app.use(express.json());
app.use("/api", router); // Replace '/api' with your actual route prefix

// Signup Routes test -> need username and password (for testing only check userController for more for more)

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

// Login Routes test -> need username and password for successful login (check userController for for more information)

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

// Logout Routes test -> deletes the cookie immediately to remove user session (check userController for for more information)

describe("GET /api/logout", () => {
  it("should respond with status 200 and a success message", async () => {
    const response = await request(app).get("/api/logout");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      success: true,
      message: "Logout successful",
    });
  });
});

// forgot password Routes test -> need registered email for sending reset link email(check userController for for more information)

describe("POST /api/forgotPassword", () => {
  it("should respond with status 200 and a success message", async () => {
    const response = await request(app).post("/api/forgotPassword").send({
      // Provide necessary request payload for testing
      email: "testuser@example.com",
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      success: true,
      message: "Password reset email sent",
    });
  });
});

// password reset Routes test ->checks the token from url and need new passoword(check userController for for more information)

describe("POST /api/password/reset/:token", () => {
  it("should respond with status 200 and a success message", async () => {
    // Replace 'token' with an actual reset token obtained from the forgotPassword test
    const resetToken = "example_reset_token";
    const response = await request(app)
      .post(`/api/password/reset/${resetToken}`)
      .send({
        // Provide necessary request payload for testing
        newPassword: "newtestpassword",
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      success: true,
      message: "Password reset successful",
    });
  });
});

// user dashboard Routes test -> returns the user details  (check userController for for more information)

describe("GET /api/userDashboard", () => {
  it("should respond with status 200 and user profile details", async () => {
    const response = await request(app).get("/api/userDashboard");

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("username");
    expect(response.body).toHaveProperty("email");
  });
});

// update password Routes test -> need current password  and new password for successful update (check userController for for more information)

describe("POST /api/password/update", () => {
  it("should respond with status 200 and a success message", async () => {
    const response = await request(app).post("/api/password/update").send({
      // Provide necessary request payload for testing
      currentPassword: "testpassword",
      newPassword: "newtestpassword",
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      success: true,
      message: "Password updated successfully",
    });
  });
});
