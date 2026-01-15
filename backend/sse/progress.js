const clients = new Map();

function sseHandler(req, res) {
    const { jobId } = req.query;

    if (!jobId) {
        return res.status(400).end();
    }

    res.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
    });

    res.write(`event: open\ndata: connected\n\n`);

    clients.set(jobId, res);

    req.on("close", () => {
        clients.delete(jobId);
    });
}

function sendProgress(jobId, message) {
    const client = clients.get(jobId);
    if (!client) return;

    client.write(`data: ${message.replace(/\n/g, "")}\n\n`);
}

function closeProgress(jobId) {
    const client = clients.get(jobId);
    if (!client) return;

    client.write(`event: end\ndata: done\n\n`);
    client.end();
    clients.delete(jobId);
}

module.exports = {
    sseHandler,
    sendProgress,
    closeProgress
};
