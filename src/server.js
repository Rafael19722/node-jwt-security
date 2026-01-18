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

console.log("--- DEBUG PATHS ---");
console.log("1. __dirname (Onde estou):", __dirname);
console.log("2. Tentando servir estáticos de:", publicPath);
console.log("3. A pasta existe?", fs.existsSync(publicPath) ? "SIM" : "NÃO");

if (fs.existsSync(publicPath)) {
    console.log("4. Arquivos dentro da pasta:", fs.readdirSync(publicPath));
} else {
    console.log("4. PASTA NÃO ENCONTRADA! Verifique o caminho.");

    console.log("O que tem aqui no __dirname:", fs.readdirSync(__dirname));
}
console.log("--- FIM DEBUG ---");

app.use(express.static(publicPath));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});
