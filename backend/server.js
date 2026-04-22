const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

//Configurations
dotenv.config();
connectDB();

const app = express();

// Middleware (Always goes before routes)
app.use(express.json());

//Route Imports
const authRoutes = require("./routes/authRoutes");
const problemRoutes = require("./routes/problemRoutes"); // Moved up

//Routes Definitions
app.use("/api/auth", authRoutes);
app.use("/api/problems", problemRoutes); // Moved up

app.get("/", (req, res) => {
    res.send("API running");
});

const trackingRoutes = require("./routes/trackingRoutes");
app.use("/api/tracking", trackingRoutes);

const dashboardRoutes = require("./routes/dashboardRoutes");
app.use("/api/dashboard", dashboardRoutes);

const activityRoutes = require("./routes/activityRoutes");
app.use("/api/activity", activityRoutes);

//Server Start (Always at the very bottom)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});