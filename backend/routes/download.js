const express = require("express");
const { startDownload } = require("../services/ffmpeg");

const router = express.Router();

router.post("/download", async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({
            success: false,
            message: "Excuse me? Where is the link?"
        });
    }

    if (!url.includes(".m3u8")) {
        return res.status(400).json({
            success: false,
            message: "Doesn't look like m3u8 file bro"
        });
    }

    try {
        const jobId = Date.now().toString();

        startDownload(url, jobId);

        return res.json({
            success: true,
            message: "It's started!",
            jobId: jobId
        });
    } catch (err) {
        console.error("[download error]", err);
        return res.status(500).json({
            success: false,
            message: "Uh oh! Something happened!"
        });
    }
});

module.exports = router;
