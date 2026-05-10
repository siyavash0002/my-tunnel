const net = require('net');
const http = require('http');

const server = http.createServer((req, res) => {
    const dest = process.env.DEST;
    const path = process.env.V_PATH || '/vercel-xhttp';

    if (req.url !== path) {
        res.writeHead(404);
        res.end('Not Found');
        return;
    }

    const [destIp, destPort] = dest.split(':');
    const client = new net.Socket();

    client.connect(destPort, destIp, () => {
        req.pipe(client).pipe(res);
    });

    client.on('error', () => {
        if (!res.headersSent) {
            res.writeHead(502);
            res.end();
        }
    });
});

export default server;
