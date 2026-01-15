import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json()); // BẮT BUỘC

app.post("/api/download", async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: "Missing url" });
    }

    // test trước cho chắc
    res.json({
      success: true,
      message: "API chạy OK",
      urlReceived: url
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log("Server running at http://localhost:" + PORT);
});
