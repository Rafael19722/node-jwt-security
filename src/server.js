require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const PORT = process.env.PORT || 3000;
const fs = require("fs");

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api", userRoutes);

const publicPath = path.join(__dirname, "public");

app.use(express.static(publicPath));

app.get("/(.*)/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});
