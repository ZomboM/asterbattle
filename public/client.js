const href = window.location.href;
const wsURL = href.replace(/http/, 'ws');
const client = new WebSocket(wsURL, 'asterbattle');
client.onerror = () => {
  console.error('Connection Error');
};

client.onopen = () => {
  console.log('WebSocket opened');
  /*
  const sendNumber = () => {
    if (client.readyState === client.OPEN) {
      const number = Math.round(Math.random() * 0xFFFFFF);
      console.log(`Sending ${number}`);
      client.send(number.toString());
      setTimeout(sendNumber, 1000);
    }
  }
  sendNumber();
  */
};

client.onclose = () => {
  console.log('WebSocket closed');
};

const sendMessage = msg => {
  client.send(JSON.stringify(msg));
}

const [nameText, playerList, voteButton] =
  ['nameText', 'playerList', 'voteButton'].map(id =>
    document.getElementById(id));

client.onmessage = msg => {
  const players = JSON.parse(msg.data).players;
  console.log(msg, ", parsed:", players)
  const list = players.map(p =>
    `<li>${p[0]}, ${p[1] ? 'ready' : 'not ready'}</li>`
  ).join('\n');
  playerList.innerHTML = list;
};

voteButton.addEventListener('click', () => {
  sendMessage({type: 'ready'});
})
nameText.addEventListener('input', () => {
  sendMessage({type: 'name', name: nameText.value});
})
