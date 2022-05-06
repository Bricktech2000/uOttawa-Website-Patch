import express from 'express';
import https from 'https';
import http from 'http';
const app = express();

const port = process.env.PORT || 3000;
const url = process.env.URL || 'https://www2.uottawa.ca';

app.use('/', (clientRequest, clientResponse) => {
  const parsedHost = url.split('/').splice(2).splice(0, 1).join('/');
  var parsedPort;
  var parsedSSL;

  if (url.startsWith('https://')) {
    parsedPort = 443;
    parsedSSL = https;
  } else if (url.startsWith('http://')) {
    parsedPort = 80;
    parsedSSL = http;
  }

  const options = {
    hostname: parsedHost,
    port: parsedPort,
    path: clientRequest.url,
    method: clientRequest.method,
    headers: {
      'User-Agent': clientRequest.headers['user-agent'],
    },
  };

  const serverRequest = parsedSSL.request(options, (serverResponse) => {
    if (serverResponse.statusCode >= 300 && serverResponse.statusCode <= 305) {
      clientResponse.writeHead(serverResponse.statusCode, {
        ...serverResponse.headers,
        location: `http://localhost:${port}${serverResponse.headers.location.replace(
          url,
          ''
        )}`,
      });
      clientResponse.end();
    } else if (
      String(serverResponse.headers['content-type']).indexOf('text/html') !== -1
    ) {
      var body = '';

      serverResponse.on('data', (chunk) => {
        body += chunk;
      });

      serverResponse.on('end', () => {
        // Make changes to HTML files when they're done being read.
        body = body.replace(/<a(.*?) href="(.*?)"(.*?)>/g, (a, b, c, d) => {
          if (c.startsWith(url)) {
            return `<a${b} href="http://localhost:${port}${c.replace(
              url,
              ''
            )}"${d}>`;
          } else {
            return `<a${b} href="${c}"${d}>`;
          }
        });

        clientResponse.writeHead(
          serverResponse.statusCode,
          serverResponse.headers
        );
        clientResponse.end(body);
      });
    } else {
      serverResponse.pipe(clientResponse, {
        end: true,
      });
      clientResponse.contentType(serverResponse.headers['content-type']);
    }
  });

  serverRequest.end();
});

app.listen(port);
console.log(`Proxying on port ${port}`);
