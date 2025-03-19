import express from 'express';
import { createServer } from 'http';
import url from 'url';
import httpProxy from 'http-proxy';
import { WebSocketServer } from 'ws';
import bodyParser from 'body-parser';
import { getMockedData } from './mockResolver.js';

const proxy = httpProxy.createProxyServer({
  ws: true,
});

const wsCache = [];
const app = express();
const server = createServer(app);

app.use(bodyParser.json())
app.post('/mock-api/send-ws-message', (req, res) => {
  wsCache.forEach(ws => {
    ws.send(JSON.stringify(req.body));
  });
  res.status(200).end();
});

app.use((req, res) => {

  const parsedUrl = url.parse(req.url, true);
  const mockedData = getMockedData(parsedUrl.pathname);

  if (mockedData) {
    console.log(`>> loading mocked data for ${parsedUrl.pathname}`);
    res.json(mockedData);
    return;
  }


  if (req.headers.upgrade && req.headers.upgrade.toLowerCase() === 'websocket') {
    proxy.ws(req, req.socket, req.headers, { target: 'ws://localhost:3333' }, (err) => {
      if (err) {
        console.error('WebSocket proxy error:', err);
      }
    });
    return;
  }

  proxy.web(req, res, { target: 'http://localhost:3000' }, (err) => {
    if (err) {
      console.error('Proxy error:', err);
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Proxy error');
    }
  });
});


const wss = new WebSocketServer({ server });


wss.on('connection', (ws) => {
  console.log('WS connected');
  
  wsCache.push(ws);
  ws.on('message', (message) => {});

  ws.on('close', () => {
    console.log('WS closed.');
  });
});

server.listen(3333, () => {
  console.log('Proxy server listening on port 3333');
});

proxy.on('error', (err, req, res) => {
    console.error('Proxy error on proxy object:', err);
    res.writeHead(500, {
        'Content-Type': 'text/plain'
    });
    res.end('Proxy error on proxy object');
});