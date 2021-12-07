#!/usr/bin/env node
const WebSocketServer = require('websocket').server;
const http = require('http');
const static = require('node-static');
const file = new static.Server('./public');

const server = http.createServer((req, res) => {
  console.log(`Received request for ${req.url}`);
  res.writeHead(404);
  res.end();
});

server.listen(8080, () => {
  console.log('Server is listening on port 8080');
});

wsServer = new WebSocketServer({
  httpServer: server,
  autoAcceptConnections: false,
});

const originIsAllowed = origin => true;

wsServer.on('request', req => {
  console.log('websocket request from ', req.origin);
  if (!originIsAllowed(req.origin)) {
    console.log('Connection from origin ' + req.origin + ' rejected.');
    req.reject();
    return;
  }

  const connection = req.accept('echo-protocol', req.origin);
  console.log('Connection accepted.');

  // echo any messages received
  connection.on('message', msg => {
    if (msg.type === 'utf8') {
      console.log(`Received message: ${msg.utf8Data}`);
      connection.sendUTF(msg.utf8Data);
    }
    else if (msg.type === 'binary') {
      console.log(`Received binary message of ${msg.binaryData.length} bytes`);
      connection.sendBytes(msg.binaryData);
    }
  });
  connection.on('close', (reasonCode, desc) => {
    console.log(`Client ${connection.remoteAddress} disconnected.`);
  });
});
