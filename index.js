const http = require('http');

http.createServer(function (req, res) {
  console.log(`${req.method} ${req.url}`);
  res.end('hello world!');
}).listen(9090);

console.log('Server is listening to port 9090');