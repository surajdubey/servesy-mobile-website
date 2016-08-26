const server = require('./server');
const port = (process.env.port || 8080);
const app = server.app()

app.listen(port)
console.log('Listening');