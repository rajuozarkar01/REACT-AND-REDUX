Tip: **I am using Mongoose in a Node.jsenvironment to interact with your MongoDB database.**

**Connecting to MongoDB Atlas Using MongoDB Shell (mongosh):**
_MongoDB Shell installed_

1. _Get Your Connection String from MongoDB Atlas:_
   _Go to your MongoDB Atlas dashboard._
   _Select your cluster and click on "Connect."_
   _Choose "Connect with the MongoDB Shell."_
   _Copy the connection string provided._
2. Open MongoDB Shell (mongosh):
   _Open a terminal or command prompt._
   _Run the mongosh command with your connection string_
   **for now here it is**
   _mongosh "mongodb+srv://starline.sygqc.mongodb.net/myDatabase" --apiVersion 1 --username pcgamedec2024 --password Starline@12_
3. _Run MongoDB Commands:_
   _To check if a user with a specific email exists:_
   _db.users.findOne({ email: "pcgamedec2024@gmail.com" })_

✅ Correct Connection String:
**mongodb+srv://pcgamedec2024:Starline%4012@cluster0.mongodb.net/myDatabase?retryWrites=true&w=majority**
_format is below_
_mongodb+srv://<username>:Starline%4012@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority_

**Error: listen EADDRINUSE:**
*Error: listen EADDRINUSE: address already in use :::5000
at Server.setupListenHandle [as _listen2] (node:net:1937:16)
at listenInCluster (node:net:1994:12)
at Server.listen (node:net:2099:7)
at Function.listen (G:\REACT AND REDUX\WebDev\temp\backend\node*modules\express\lib\application.js:635:24)\*

**Find and Kill the Process Using Port 5000**
_For Windows (PowerShell)_
netstat -ano | findstr :5000
_Look for the last column (PID). Then, terminate the process using_
taskkill /PID <PID> /F
(Replace <PID> with the actual process ID.)
_nodemon server.js_ restart server

--
**backend/controller**
**backend/controllers/userRoutes.js**
_userController.js file, which handles user authentication and CRUD operations._
**backend/controllers/serviceController.js**
_serviceController.js file, which manages CRUD operations for services._
**backend/controllers/orderController.js**
_orderController.js with all the necessary functions for handling orders_
**Identify and Kill the Process Using the Port:**

**Possible Reasons for 500 Error**
_1️⃣ User Password Might Be Missing in MongoDB_
_check with : db.users.findOne({ email: "pcgamedec2024@gmail.com" })_
_2️⃣ JWT_SECRET Might Not Be Defined_
_In userController.js, you have: const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";_

**API Routs Test : Login on Postman** Error :
{
"message": "Error logging in",
"error": {}
}
checked.

1. _Ensure JWT_SECRET is Set_
   _JWT_SECRET=your_super_secret_key_
2. password added on mongodb shell manually
3. _models/user.js=>userSchema include a password fiel_ if not =>
   _This means MongoDB won't store the password when a user is created via API, but you manually added it in the database._

**Steps to Update the Password Correctly**
Step 1: Generate a bcrypt hash for "Starline@12"
_Your password is stored as a bcrypt hash, which means you cannot directly set "Starline@12" as the password in MongoDB. Instead  
successfully generated the bcrypt hash for "Starline@12".
using 'node' cmd on backend in REPL_
📌 Step 1: Update Password in MongoDB
Open MongoDB Shell (mongosh)
Run the following command
_db.users.updateOne(
{ email: "pcgamedec2024@gmail.com" },
{ $set: { password: "$2b$10$y7cveRxU0k4BW5UaHnRq9edQzlrtnBzxx3keAmf33dhLdHeY5xh6u" } }
)_
**resolved : your_jwt_token_here**

_✅ 3. Login User & Get Token
POST : http://localhost:5002/api/users/login
{
"email": "john@example.com",
"password": "123456"
}_
result : **"message": "Invalid credentials"**
**steps taken**
1️⃣ Ensure User Exists in the Database
2️⃣ Verify the Stored Password
3️⃣ Confirm Password Comparison
4️⃣ Ensure Password Hashing in Registration
🔹 Possible Issues & Fixes
✅ Issue 1: Password Mismatch in bcrypt.compare
✅ Issue 2: Incorrect Password Being Sent
✅ Issue 3: Login Route is Skipping Execution
_Make sure your request URL is correct in Postman:_
_http://localhost:5002/api/users/login(inthis case: )_
🔍 Possible Issues & Fixes:
1️⃣ Check Validation Errors
2️⃣ Check Hashed Password Comparison
3️⃣ Try Manually Comparing Password
4️⃣ Fix Debugging in Login Route
✅ Fix: Use CommonJS Syntax in Node.js REPL
_const bcrypt = require("bcryptjs");_
**> Password Match: false**
_The issue is clear now: the password stored in the database is not matching the entered password even though they seem to be the same._
🔍 What You Can Do:
✅ Solution 1: Reset the User’s Password
Since the stored hash doesn't match the one generated for "123456", try manually updating the password in MongoDB:

1. Generate a new hash for "123456" in your Node.js REPL:
   **const bcrypt = require("bcryptjs");**
   **bcrypt.hash("123456", 10).then(console.log);**
2. Copy the new hash and update it in MongoDB
   _db.users.updateOne(
   { email: "john@example.com" },
   { $set: { password: "NEW_HASH_HERE" } }
   );_
3. **new hash updated it in MongoDB: via Postman**
   POST : http://localhost:5002/api/users/login
   JSON: _{"email": "john@example.com", "password": "123456"}_
   result : 200 OK
   _Now that the correct hash is stored, bcrypt is successfully verifying the password_

**backend/middleware/authMiddleware.js**
_authMiddleware.js is handling authentication (authenticateToken) and admin authorization (isAdmin)._
