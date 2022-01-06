import {Player} from './player.js'

export class Controller {
  constructor() {
    this.state = 'init';
    this.players = new Set();
    this.votes = 0;
  }
  addPlayer(connection) {
    const p = new Player(connection, this);
    this.players.add(p);
    this.updatePlayers();
    return p;
  }
  removePlayer(p) {
    this.players.delete(p);
    if (p.hasVoted) this.votes--;
    this.updatePlayers();
  }
  updatePlayers() {
    if (this.votes == this.players.size) console.log('aeiou');
    this.broadcast({
      players: [...this.players].map(p => [p.name, p.hasVoted]),
    });
  }
  broadcast(msg) {
    [...this.players].forEach(p => p.sendMessage(msg));
  }
}
