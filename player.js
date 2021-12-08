export class Player {
  constructor(connection) {
    this.connection = connection;
  }
  sendMessage(msg) {
    this.connection.sendUTF(JSON.stringify(msg));
  }
}
