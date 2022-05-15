import express from 'express';
import https from 'https';
import http from 'http';
import patches from './patches/patches.js';
const app = express();

const port = process.env.PORT || 3000;
const clientRequestHeadersHost = 'uottawa.emilien.ca';
const requestUrl = process.env.REQUEST_URL || 'https://www2.uottawa.ca';
const alternativeUrls = process.env.ALTERNATIVE_URLS
  ? JSON.parse(process.env.ALTERNATIVE_URLS)
  : [
      'https://www2.uottawa.ca',
      'https://www.uottawa.ca',
      'http://www2.uottawa.ca',
      'http://www.uottawa.ca',
    ];

app.use('/', (clientRequest, clientResponse) => {
  const parsedHost = requestUrl.split('/').splice(2).splice(0, 1).join('/');
  var parsedPort;
  var parsedSSL;

  if (requestUrl.startsWith('https://')) {
    parsedPort = 443;
    parsedSSL = https;
  } else if (requestUrl.startsWith('http://')) {
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
        location: `http://${
          clientRequestHeadersHost || clientRequest.headers.host
        }${alternativeUrls.reduce(
          (acc, cur) => acc.replace(cur, ''),
          serverResponse.headers.location
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
        for (var patch of patches)
          body = patch(body, {
            domain: requestUrl,
            host: clientRequestHeadersHost || clientRequest.headers.host,
            path: clientRequest.path,
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
