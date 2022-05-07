import express from 'express';
import http from 'http';

const app = express();
const port = 3000;

app.get('*', async (req, res) => {
  const url = req.url.slice(1);
  console.log(url);

  // try {
  // const response = await fetch(url);
  // const data = await response.text();
  // res.send(data);
  // } catch (e) {
  // res.status(404).send('Not Found');
  // }

  const options = {
    hostname: 'www.google.com',
    port: 80,
    path: req.url,
    method: req.method,
    headers: req.headers,
  };

  const proxy = http.request(options, (response) => {
    res.writeHead(response.statusCode, response.headers);
    response.pipe(res, {
      end: true,
    });
  });

  res.pipe(proxy, {
    end: true,
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

/*
http://localhost:3000/https://google.com/
*/
