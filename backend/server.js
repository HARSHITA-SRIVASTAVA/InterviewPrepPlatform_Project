const express = require("express");
const app = express();

app.use(express.json());

// Import routes
const authRoutes = require("./routes/authRoutes");

// Use routes
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("API running");
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});