#!/usr/bin/env node
const WebSocketServer = require('websocket').server;
const http = require('http');
const static = require('node-static');
const file = new static.Server('./public');

const server = http.createServer((req, res) => {
  console.log(`HTTP request for ${req.url}`);
  req.addListener('end', () => {
    file.serve(req, res);
  }).resume();
});

server.listen(8080, () => {
  console.log('Server is listening on port 8080');
});

wsServer = new WebSocketServer({
  httpServer: server,
  autoAcceptConnections: false,
});

wsServer.on('request', req => {
  console.log('WebSocket request from ', req.origin);
  if (!req.requestedProtocols.includes('asterbattle')) {
    console.log(`Connection from ${req.origin} rejected.`);
    req.reject();
    return;
  }

  const connection = req.accept('asterbattle', req.origin);
  console.log('Connection accepted.');

  // echo any messages received
  connection.on('message', msg => {
    if (msg.type === 'utf8') {
      console.log(`Received ${msg.utf8Data}; echoing`);
      connection.sendUTF(msg.utf8Data);
    }
  });
  connection.on('close', (reasonCode, desc) => {
    console.log(`Client ${connection.remoteAddress} disconnected.`);
  });
});
