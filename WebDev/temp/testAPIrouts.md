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
