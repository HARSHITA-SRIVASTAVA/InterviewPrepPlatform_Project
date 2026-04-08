const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

// Connect DB
connectDB();

//app_var = expree()
const app = express();

//middleware
app.use(express.json());

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {    //router
    res.send("API running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {   //running 
    console.log(`Server running on port ${PORT}`);
});