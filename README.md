# E-commerce Backend API

Welcome to the E-commerce App Backend API repository. Here, you'll find the backend API for an e-commerce project, providing essential features to support the functionality of your e-commerce application.

## Features:

1.  **User Management:**

    - Facilitates user registration and authentication.
    - Manages user profiles and account details.

2.  **Product Catalog:**

    - Offers CRUD operations for products.
    - Provides product details and catalog information retrieval.

3.  **Order Processing:**

    - Manages customer orders and order history.
    - Tracks order status and processes orders efficiently.

4.  **Shopping Cart Functionality:**

    - Enables users to manipulate their shopping carts (add, remove, update items).
    - Calculates and displays the total price of items in the cart accurately.

5.  **Payment Integration:**

    - Integrates secure payment gateways for seamless transactions.
    - Currently supports Stripe and Razorpay (in production).

6.  **Security:**

    - Implements robust authentication and authorization mechanisms to ensure data security.

## How to Use in Your Frontend/Full Stack Project:

### 1. Clone the Repository:

If you're a frontend or full stack developer needing a backend API for your project, you can clone this repository. Use the following command to clone:

bashCopy code

`git clone <repository_url>`

Replace `<repository_url>` with the actual URL of this repository.

### 2. Integrate with Your Frontend:

Once you've cloned the repository, you can integrate the backend API with your frontend application using HTTP requests. Here's a basic guide on how to do this:

- **API Endpoints:** Explore the API documentation to understand the available endpoints and their functionalities.

the API endpoints available in this backend:

### User Management:

# API Documentation

### User Authentication and Management

These routes handle user authentication, profile management, and user administration functionalities.

- **POST /api/v1/signup**

  - Registers a new user.
  - Example: `POST /api/v1/signup`

- **POST /api/v1/login**

  - Authenticates a user.
  - Example: `POST /api/v1/login`

- **GET /api/v1/logout**

  - Logs out the authenticated user.
  - Example: `GET /api/v1/logout`

- **POST /api/v1/forgotPassword**

  - Initiates the password reset process by sending a reset email to the user's email address.
  - Example: `POST /api/v1/forgotPassword`

- **POST /api/v1/password/reset/:token**
  - Resets the password using the reset token sent to the user's email.
  - Example: `POST /api/v1/password/reset/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`

### User Profile Management

These routes handle user profile-related functionalities.

- **GET /api/v1/userDashboard**

  - Retrieves the profile information of the authenticated user.
  - Example: `GET /api/v1/userDashboard`

- **POST /api/v1/password/update**

  - Updates the password of the authenticated user.
  - Example: `POST /api/v1/password/update`

- **POST /api/v1/userdashboard/update**
  - Updates the profile details of the authenticated user.
  - Example: `POST /api/v1/userdashboard/update`

### Admin and Manager Functionality

These routes are restricted to admin and manager roles for user administration.

- **GET /api/v1/admin/users**

  - Retrieves a list of all users (admin-only).
  - Example: `GET /api/v1/admin/users`

- **GET /api/v1/admin/user/:id**

  - Retrieves details of a specific user by ID (admin-only).
  - Example: `GET /api/v1/admin/user/123`

- **PUT /api/v1/admin/user/:id**

  - Updates details of a specific user by ID (admin-only).
  - Example: `PUT /api/v1/admin/user/123`

- **DELETE /api/v1/admin/user/:id**

  - Deletes a specific user by ID (admin-only).
  - Example: `DELETE /api/v1/admin/user/123`

- **GET /api/v1/manager/users**
  - Retrieves a list of all users (manager-only).
  - Example: `GET /api/v1/manager/users`

## Product Catalog

### Products

These routes handle product-related functionalities.

- **GET /api/v1/products**
  - Retrieves a list of all products available in the catalog.
  - Example: `GET /api/v1/products`

### Admin Product Management

These routes are restricted to admin role for product administration.

- **POST /api/v1/admin/product/add**
  - Adds a new product to the catalog (admin-only).
  - Example: `POST /api/v1/admin/product/add`

## Payment Integration

### Capturing Secret Keys

These routes are used to retrieve secret keys for integrating payment gateways securely.

- **GET /api/v1/stripekey**

  - Retrieves the Stripe secret key.
  - Requires user to be logged in.
  - Example: `GET /api/v1/stripekey`

- **GET /api/v1/razorpaykey**
  - Retrieves the Razorpay secret key.
  - Requires user to be logged in.
  - Example: `GET /api/v1/razorpaykey`

### Payment Handling

These routes are used to handle payments using Stripe and Razorpay integration.

- **POST /api/v1/pay/stripepay**

  - Initiates payment processing using Stripe integration.
  - Requires user to be logged in.
  - Example: `POST /api/v1/pay/stripepay`

- **POST /api/v1/pay/razorpay**
  - Initiates payment processing using Razorpay integration.
  - Requires user to be logged in.
  - Example: `POST /api/v1/pay/razorpay`

## 🐛 Bug Reporting

Feel free to [open an issue](https://github.com/abhiraj-ku/Ecom-App/issues) on GitHub if you find any bug.

## ⭐ Feature Request

- Feel free to [Open an issue](https://github.com/abhiraj-ku/Ecom-App/issues) on GitHub to request any additional features you might need for your use case.

# Connect with me on:

- [LinkedIn](https://www.linkedin.com/in/abhishek-ko/). It takes few seconds to click on that 'connect' button 😉.
