export class Player {
  constructor(connection, controller) {
    this.connection = connection;
    this.hasVoted = false;
    this.name = "Player" + Math.floor(Math.random() * 10000);
    this.controller = controller;
    connection.on('message', msgData => {
      if (msgData.type === 'utf8') {
        const msgStr = msgData.utf8Data;
        const msg = JSON.parse(msgStr);
        if (msg.type == 'name') {
          this.name = msg.name;
        }
        if (msg.type == 'ready') {
          this.hasVoted = true;
          this.controller.votes++;
        }
        this.controller.updatePlayers();
      }
    })
  }
  sendMessage(msg) {
    this.connection.sendUTF(JSON.stringify(msg));
  }
}
