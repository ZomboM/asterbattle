const WebSocket = require('websocket').w3cwebsocket;

const _client = new WebSocket('ws://localhost:8080/', 'echo-protocol');

_client.onerror = () => {
  console.log('Connection Error');
};

_client.onopen = () => {
  console.log('WebSocket client connected');

  function sendNumber() {
    if (_client.readyState === _client.OPEN) {
      const number = Math.round(Math.random() * 0xFFFFFF);
      _client.send(number.toString());
      setTimeout(sendNumber, 1000);
    }
  }
  sendNumber();
};

_client.onclose = function() {
  console.log('echo-protocol Client Closed');
};

_client.onmessage = function(e) {
  if (typeof e.data === 'string') {
    console.log("Received: '" + e.data + "'");
  }
};
