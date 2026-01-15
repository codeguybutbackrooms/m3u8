const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

const DOWNLOAD_DIR = path.join(__dirname, "../../downloads");
const TEMP_DIR = path.join(DOWNLOAD_DIR, "temp");
const OUTPUT_DIR = path.join(DOWNLOAD_DIR, "output");

function ensureDir(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

ensureDir(DOWNLOAD_DIR);
ensureDir(TEMP_DIR);
ensureDir(OUTPUT_DIR);

function startDownload(m3u8Url, jobId) {
    const outputFile = path.join(OUTPUT_DIR, `${jobId}.mp4`);
    const logFile = path.join(__dirname, "../../logs/ffmpeg.log");

    const ffmpegArgs = [
        "-y",
        "-i", m3u8Url,
        "-c", "copy",
        "-bsf:a", "aac_adtstoasc",
        outputFile
    ];

    console.log(`[ffmpeg] Job ${jobId} started`);
    console.log(`[ffmpeg] Output -> ${outputFile}`);

    const ffmpeg = spawn("ffmpeg", ffmpegArgs);
  
    ffmpeg.stdout.on("data", (data) => {
        const msg = data.toString();
        console.log(`[ffmpeg ${jobId}] ${msg}`);
        fs.appendFileSync(logFile, msg);
    });
  
    ffmpeg.stderr.on("data", (data) => {
        const msg = data.toString();
        console.log(`[ffmpeg ${jobId}] ${msg}`);
        fs.appendFileSync(logFile, msg);
    });

    ffmpeg.on("close", (code) => {
        if (code === 0) {
            console.log(`[ffmpeg] Job ${jobId} DONE 🎉`);
        } else {
            console.log(`[ffmpeg] Job ${jobId} FAILED 💥 (code ${code})`);
        }
    });

    ffmpeg.on("error", (err) => {
        console.error(`[ffmpeg] Cannot start ffmpeg`, err);
    });
}

module.exports = {
    startDownload
};
