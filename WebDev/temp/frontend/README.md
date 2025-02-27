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
