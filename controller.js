import {Player} from './player.js'
export class Controller {
  constructor() {
    this.state = 'init';
    this.players = new Set();
    this.votes = 0;
  }

  addPlayer(connection) {
    const p = new Player(connection);
    this.players.add(p);
    this.updatePlayers();
    return p;
  }
  removePlayer(p) {
    this.players.delete(p);
    this.updatePlayers();
  }
  updatePlayers() {
    console.log(`number of players is now ${this.players.size}`);
    this.broadcast({
      numPlayers: this.players.size,
      votes: this.votes,
    });
  }
  broadcast(msg) {
    [...this.players].forEach(p => p.sendMessage(msg));
  }
}
