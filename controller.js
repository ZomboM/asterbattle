import {Player} from './player.js'
export class Controller {
  constructor() {
    this.players = new Set();
    this.votes = 0;
    this.state = 'init';
  }
  addPlayer(connection) {
    const p = new Player(connection);
    this.players.add(p);
    console.log(`number of players is now ${this.players.size}`)
    return p;
  }
  removePlayer(p) {
    this.players.delete(p);
  }
}
