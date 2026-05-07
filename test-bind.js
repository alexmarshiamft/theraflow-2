const http = require('http');

function tryBind(port) {
  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      res.end('Hello');
    });
    server.on('error', (e) => {
      resolve({port, success: false, error: e.code});
    });
    server.listen(port, '127.0.0.1', () => {
      server.close(() => resolve({port, success: true}));
    });
  });
}

async function main() {
  for (let port = 3000; port < 60000; port += 1000) {
    const res = await tryBind(port);
    if (res.success) {
      console.log('Successfully bound to port', port);
      break;
    } else {
      console.log('Failed port', port, res.error);
    }
  }
}

main();
