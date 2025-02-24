const express = require("express");
const app = express();
const userRoutes = require("./routes/users"); // Adjust path if needed

app.use(express.json());
app.use(userRoutes); // Mount user routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
