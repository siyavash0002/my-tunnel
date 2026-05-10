const net = require('net');

module.exports = (req, res) => {
    const dest = process.env.DEST;
    const path = process.env.V_PATH || '/vercel-xhttp';

    if (req.url.split('?')[0] !== path) {
        res.statusCode = 404;
        res.end();
        return;
    }

    const [destIp, destPort] = dest.split(':');
    const client = net.connect(destPort, destIp, () => {
        req.pipe(client).pipe(res);
    });

    client.on('error', () => {
        res.statusCode = 502;
        res.end();
    });
};
