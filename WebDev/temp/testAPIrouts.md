✅ Steps to Test API Routes

1. Start Your Backend Server
   Run your backend using:
2. npm run dev
   or
   node server.js
   Ensure there are no errors in the terminal.
3. Use Postman or Thunder Client (VS Code extension)
   o For POST requests, send JSON data in the request body.
   o For GET requests, check if data is being fetched correctly.
   o For PUT and DELETE requests, use a valid id from your database.
4. Check API Endpoints
   o User API (/api/users)
    POST /register → Register a new user
    POST /login → Login user
    GET / → Get all users
    GET /:id → Get a single user
    PUT /:id → Update user
    DELETE /:id → Delete user
   o Service API (/api/services)
    POST / → Add a service
    GET / → Get all services
    GET /:id → Get a single service
    PUT /:id → Update service
    DELETE /:id → Delete service
   o Order API (/api/orders)
    POST / → Create order
    GET / → Get all orders
    GET /:id → Get single order
    PUT /:id → Update order
    DELETE /:id → Delete order
5. Check Database (MongoDB)
   o Use MongoDB Compass or MongoDB Atlas to verify that the data is being stored, updated, and deleted correctly.

---

🔍 Troubleshooting
• If you get "Cannot connect to server", check if MongoDB is running.
• If you get "Unauthorized", ensure you're sending the correct JWT token in Authorization headers for protected routes.
• If you get validation errors, check if the request body matches the expected format.

---

Here’s how you can test your API in **Postman** with the required paths and JSON bodies.

---

## ✅ **1. Register a User**

**Path:** `POST http://localhost:5000/api/users/register`  
**JSON Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456",
  "role": "user"
}
```

📌 **Expected Response (201 Created)**

```json
{
  "message": "User registered successfully",
  "token": "your_jwt_token_here"
}
```

---

## ✅ **2. Register an Admin**

**Path:** `POST http://localhost:5000/api/users/register`  
**JSON Body:**

```json
{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "admin123",
  "role": "admin"
}
```

📌 **Expected Response (201 Created)**

```json
{
  "message": "User registered successfully",
  "token": "your_jwt_token_here"
}
```

🔹 **Save the token for future admin-only requests.**

---

## ✅ **3. Login User & Get Token**

**Path:** `POST http://localhost:5000/api/users/login`  
**JSON Body:**

```json
{
  "email": "john@example.com",
  "password": "123456"
}
```

📌 **Expected Response (200 OK)**

```json
{
  "message": "Login successful",
  "token": "your_jwt_token_here"
}
```

🔹 **Copy the token and use it for further requests.**

---

## ✅ **4. Login Admin & Get Token**

**Path:** `POST http://localhost:5000/api/users/login`  
**JSON Body:**

```json
{
  "email": "admin@example.com",
  "password": "admin123"
}
```

📌 **Expected Response (200 OK)**

```json
{
  "message": "Login successful",
  "token": "your_admin_jwt_token_here"
}
```

🔹 **Save this token for admin-only access.**

---

## ❌ **5. Try Accessing Admin-Only Routes with a Non-Admin User**

**Path:** `GET http://localhost:5000/api/users`  
**Headers:**

```
Authorization: Bearer your_user_jwt_token_here
```

📌 **Expected Response (403 Forbidden)**

```json
{
  "message": "Access denied. Admins only."
}
```

🔹 **If you get a 403 error, that means role-based access is working correctly!**

---

## ✅ **6. Get All Users as an Admin**

**Path:** `GET http://localhost:5000/api/users`  
**Headers:**

```
Authorization: Bearer your_admin_jwt_token_here
```

📌 **Expected Response (200 OK)**

```json
[
  {
    "_id": "user_id_1",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  },
  {
    "_id": "user_id_2",
    "name": "Admin User",
    "email": "admin@example.com",
    "role": "admin"
  }
]
```

🔹 **If this works, your admin can successfully fetch all users!**

---

## ✅ **7. Update a User (Admin Only)**

**Path:** `PUT http://localhost:5000/api/users/{user_id}`  
**Headers:**

```
Authorization: Bearer your_admin_jwt_token_here
```

**JSON Body (Example Update for John Doe):**

```json
{
  "role": "admin"
}
```

📌 **Expected Response (200 OK)**

```json
{
  "message": "User updated successfully",
  "user": {
    "_id": "user_id_1",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "admin"
  }
}
```

---

## ✅ **8. Delete a User (Admin Only)**

**Path:** `DELETE http://localhost:5000/api/users/{user_id}`  
**Headers:**

```
Authorization: Bearer your_admin_jwt_token_here
```

📌 **Expected Response (200 OK)**

```json
{
  "message": "User deleted successfully"
}
```

---

## 🚀 **Final Steps**

- If all tests pass, your **authentication, role-based authorization, and CRUD operations** are working correctly.
- **If anything fails**, check the server logs (`console.log` or error messages) for debugging.
- **You can also add more roles** (e.g., `moderator`) and expand access controls.

Let me know if you need further improvements! 🚀🔥
