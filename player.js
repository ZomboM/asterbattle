export class Player {
  constructor(connection, controller) {
    this.connection = connection;
    this.hasVoted = false;
    this.name = '';
    this.controller = controller;
    connection.on('message', msgData => {
      if (msgData.type === 'utf8') {
        const msg = JSON.parse(msgData.utf8Data);
        if (msg.type == 'name') {
          this.name = msg.name;
        }
        if (msg.type == 'ready') {
          this.hasVoted = true;
        }
        this.controller.updatePlayers();
      }
    });
  }
  sendMessage(msg) {
    this.connection.sendUTF(JSON.stringify(msg));
  }
}
