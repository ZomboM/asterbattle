#!/usr/bin/env node
import WebSocket from 'websocket';
import http from 'http';
import NodeStatic from 'node-static';
import {Controller} from './controller.js';

const staticServer = new NodeStatic.Server('./public');

const server = http.createServer((req, res) => {
  console.log(`HTTP request for ${req.url}`);
  req.addListener('end', () => {
    staticServer.serve(req, res);
  }).resume();
});

const controller = new Controller();

server.listen(8080, () => {
  console.log('Server is listening on port 8080');
});

const wsServer = new WebSocket.server({
  httpServer: server,
  autoAcceptConnections: false,
});

wsServer.on('request', req => {
  if (!req.requestedProtocols.includes('asterbattle') ||
      controller.state !== 'init')
  {
    console.log(`Connection from ${req.origin} rejected.`);
    req.reject();
    return;
  }

  const connection = req.accept('asterbattle', req.origin);
  console.log('New player from ', req.origin);
  const player = controller.addPlayer(connection);

  connection.on('close', (reasonCode, desc) => {
    console.log(`Player ${connection.remoteAddress} disconnected.`);
    controller.removePlayer(player)
  });
});
