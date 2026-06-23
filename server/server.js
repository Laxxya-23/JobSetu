require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path"); // Paths handle karne ke liye

const adminRoutes = require("./routes/adminRoutes");
const jobRoutes = require("./routes/jobRoutes");
const resultRoutes = require("./routes/resultRoutes");
const admitCardRoutes = require("./routes/admitCardRoutes");
const answerKeyRoutes = require("./routes/answerKeyRoutes");
const contactRoutes = require("./routes/contactRoutes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Database Connection
console.log("MONGO_URI =", process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("✅ MongoDB Connected Successfully");
})
.catch((err) => {
    console.log("❌ MongoDB Error:", err.message);
});

// Saare Backend API Routes
app.use("/api", jobRoutes);
app.use("/api", resultRoutes);
app.use("/api", admitCardRoutes);
app.use("/api", answerKeyRoutes);
app.use("/api", contactRoutes);
app.use("/api", adminRoutes);

// ... baaki saare codes aur API routes ke niche ...

// Frontend Static Files Serve karna
app.use(express.static(path.resolve(__dirname, "..", "client")));

// ❌ Purane app.get("(.*)", ...) ko hata kar yeh likhiye:
app.use((req, res, next) => {
    // Agar koi API route nahi hai, toh seedhe index.html serve karo
    if (!req.path.startsWith('/api')) {
        return res.sendFile(path.resolve(__dirname, "..", "client", "index.html"));
    }
    next();
});

// Port configuration
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server Running on Port ${PORT}`);
});