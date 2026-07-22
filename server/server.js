const express = require("express");
const cors = require("cors");
const dns = require("dns");
const pasteRoutes = require("./routes/pasteRoute");

require("dotenv").config();

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/pastes", pasteRoutes);

app.get("/", (req, res) => {
    res.send("CodeVault Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});