import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post("/api/download", (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "Missing url" });
  }

  res.json({
    success: true,
    message: "Backend OK 😎",
    url
  });
});

app.get("/", (req, res) => {
  res.send("Backend alive");
});

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
