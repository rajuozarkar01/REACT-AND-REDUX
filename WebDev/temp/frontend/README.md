**Steps to start mongoDB**
✅ Step 1: Get Your MongoDB Atlas Connection String
Go to MongoDB Atlas and log in.
Select your database cluster.
Click "Connect" → "Connect your application".(compass/atlas, etc.)
Copy the connection string. It looks like this:
mongodb+srv://<username>:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority
Replace <username> and <password> with your actual MongoDB credentials.
✅ Step 2: Store Your MongoDB URL in a .env File
✅ Step 3: Install dotenv and Mongoose(if not installed)
npm install dotenv mongoose
✅ Step 4: Connect MongoDB in server.js
✅ Step 5: Start Your Node.js Server
node server.js
✅ **Step 6: Verify Connection in MongoDB Compass**
Open MongoDB Compass.
Click "New Connection" and paste your MongoDB Atlas connection string (MONGO_URI).
Click "Connect".
You should see your database and collections.
✅ Next Time You Start the Server

1. **authController.js** handling user authentication and generating a JWT token. It uses bcrypt.compare to verify the hashed password and ensures the token is generated securely.

Summary:
Login Function:

Finds the user by email.

Uses bcrypt.compare to verify the hashed password.

Generates a JWT token upon successful login.

Responds with the token or an error message.

Next Steps:
Please share the contents of your userController.js for further verification. 😊

Let's ensure everything is set up correctly!

2. **userController.js** handling various user-related operations such as registration, authentication, fetching user details, updating user details, and deleting users.

Summary:
Register User:

Hashes the password before saving the user to the database.

Generates a JWT token upon successful registration.

Responds with a success message and token or an error message.

Login User:

Finds the user by email and verifies the hashed password using bcrypt.compare.

Generates a JWT token upon successful login.

Responds with a success message and token or an error message.

Get User by ID:

Fetches user details by ID, excluding the password.

Responds with the user details or an error message.

Get All Users:

Fetches all users, excluding the passwords.

Responds with the list of users or an error message.

Update User:

Updates user details, including hashing the password if it is updated.

Responds with a success message or an error message.

Delete User:

Deletes a user by ID, ensuring admins cannot delete themselves.

Responds with a success message or an error message.

Next Steps:
Please share the contents of your authMiddleware.js for further verification. 😊

Let's ensure everything is set up correctly! 🚀

3.**authMiddleware.js** authenticating the token and checking if the user has an admin role.

Summary:
Token Authentication (authenticateToken):

Checks for the presence of the Authorization header and verifies the token using jwt.verify.

Fetches user details from the database and attaches the user object to the request.

Handles errors for missing, expired, or invalid tokens.

Admin Role Check (isAdmin):

Checks if the authenticated user has the admin role and returns an appropriate response if not.

Next Steps:
