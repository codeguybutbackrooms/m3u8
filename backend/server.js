const express = require("express");
const cors = require("cors");
const path = require("path");

const downloadRoute = require("./routes/download");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use("/", express.static(path.join(__dirname, "../frontend")));

app.use("/api", downloadRoute);

app.listen(PORT, () => {
    console.log("===================================");
    console.log(`[server] M3U8 Downloader running`);
    console.log(`[server] http://localhost:${PORT}`);
    console.log("===================================");
});
