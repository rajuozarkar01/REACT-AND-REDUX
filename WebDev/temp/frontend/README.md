Error: Failed to scan for dependencies from entries:
G:/REACT AND REDUX/WebDev/temp/frontend/index.html

X [ERROR] The JSX syntax extension is not currently enabled

    src/components/Register.js:39:4:
      39 │     <div className="bg-white p-6 rounded-lg shadow-md w-full max-w...
         ╵     ^

_The error you're seeing is due to esbuild treating .js files as plain JavaScript without JSX support. Since your Register.js and other React components use JSX, esbuild needs to parse them correctly_

[plugin:vite:import-analysis] Failed to resolve import "react-icons/fc" from "src/components/Login.jsx". Does the file exist?
_This usually happens if the react-icons package isn't installed or if there's an issue with the path._
**Steps to start mongoDB**
✅ Step 1: Get Your MongoDB Atlas Connection String
Go to MongoDB Atlas and log in.
Select your database cluster.
Click "Connect" → "Connect your application".
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
