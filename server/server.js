require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const adminRoutes = require("./routes/adminRoutes");

const jobRoutes = require("./routes/jobRoutes");
const resultRoutes = require("./routes/resultRoutes");
const admitCardRoutes = require("./routes/admitCardRoutes");
const answerKeyRoutes = require("./routes/answerKeyRoutes");
const contactRoutes = require("./routes/contactRoutes");

const app = express();

app.use(cors());
app.use(express.json());

console.log("MONGO_URI =", process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("✅ MongoDB Connected Successfully");
})
.catch((err) => {
    console.log("❌ MongoDB Error:", err.message);
});

app.use("/api", jobRoutes);
app.use("/api", resultRoutes);
app.use("/api", admitCardRoutes);
app.use("/api", answerKeyRoutes);
app.use("/api", contactRoutes);
app.use("/api", adminRoutes);

app.get("/", (req, res) => {
    res.send("🚀 JobSetu Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server Running on Port ${PORT}`);
});