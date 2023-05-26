require('dotenv').config()
const server = require('./express')()
const { port = 5500 } = require('./config');

server.listen(port, async () => {
    console.log(
        '\x1b[36m%s\x1b[0m',
        `server is running at http://localhost:${port}`
    );
})