const href = window.location.href;
const wsURL = href.replace(/http/, 'ws');

const [nameText, playerList, voteButton] =
  ['nameText', 'playerList', 'voteButton'].map(id =>
    document.getElementById(id));

nameText.value = "Player" + Math.floor(Math.random() * 10000);

const client = new WebSocket(wsURL, 'asterbattle');
client.onerror = () => {
  console.error('Connection Error');
};

client.onopen = () => {
  console.log('WebSocket opened');
  sendName();
};

client.onclose = () => {
  console.log('WebSocket closed');
};

client.onmessage = msg => {
  const players = JSON.parse(msg.data).players;
  const list = players.map(p =>
    `<li>${p[0]}, ${p[1] ? 'ready' : 'not ready'}</li>`
  ).join('\n');
  playerList.innerHTML = list;
};

const sendMessage = msg => {
  client.send(JSON.stringify(msg));
};

voteButton.addEventListener('click', () => {
  sendMessage({type: 'ready'});
});
const sendName = () => {
  sendMessage({type: 'name', name: nameText.value});
};
nameText.addEventListener('input', sendName);
