const http2 = require('http2');
const net = require('net');

export default function (req, res) {
    const dest = process.env.DEST; // 178.105.3.15:10085
    const path = process.env.V_PATH || '/vercel-xhttp';

    if (!req.url.startsWith(path)) {
        res.writeHead(404);
        res.end();
        return;
    }

    const [destIp, destPort] = dest.split(':');
    const target = net.connect(destPort, destIp, () => {
        req.pipe(target).pipe(res);
    });

    target.on('error', (err) => {
        res.writeHead(502);
        res.end();
    });

    req.on('close', () => target.destroy());
}
