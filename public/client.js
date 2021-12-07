const client = new WebSocket('ws://localhost:8080/', 'asterbattle');
client.onerror = () => {
  console.error('Connection Error');
};

client.onopen = () => {
  console.log('WebSocket opened');

  const sendNumber = () => {
    if (client.readyState === client.OPEN) {
      const number = Math.round(Math.random() * 0xFFFFFF);
      console.log(`Sending ${number}`);
      client.send(number.toString());
      setTimeout(sendNumber, 1000);
    }
  }
  sendNumber();
};

client.onclose = () => {
  console.log('WebSocket closed');
};

client.onmessage = msg => {
  if (typeof msg.data === 'string') {
    console.log(`Received ${msg.data}`);
  }
};
