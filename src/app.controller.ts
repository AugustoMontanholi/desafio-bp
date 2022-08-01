import { Controller, Get } from '@nestjs/common';

import { SquaresService } from './squares/squares.service';
import { PlayersService } from './players/players.service';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly squaresService: SquaresService,
    private readonly playersService: PlayersService,
  ) {}

  @Get('status')
  getStatus() {
    return this.appService.getStatus();
  }

  @Get('games/simulate')
  async simulateGame() {
    const log = (msg) => {
      const debug = process.env.DEBUG === 'true';
      if (debug) console.log(msg);
    };

    const squares = await this.squaresService.findAll();
    const players = await this.playersService.findAll();

    players.sort(() => Math.random() - 0.5);
    log(`players sequence => ${players.map((pl) => pl.name).join(', ')}`);

    for (let i = 0; i < 1000; i += 1) {
      log(`Round ${i + 1}`);
      for (const player of players) {
        const steps = Math.floor(Math.random() * (6 - 1 + 1) + 1);
        log(`player ${player.name} walk ${steps} squares`);

        if (player.squareIndex + steps > squares.length) {
          player.account += 100;
        }

        player.squareIndex =
          player.squareIndex + steps > squares.length
            ? player.squareIndex + steps - squares.length
            : player.squareIndex + steps;

        const square = squares.find((sq) => sq.index === player.squareIndex);
        if (!square) console.log(squares.length, player.squareIndex);
        log(`player ${player.name} stopped at ${square.name}`);

        if (square.value === 0) continue;

        if (!square.ownerId) {
          if (player.type === 'impulsive') {
            if (player.account >= square.value) {
              log(`player ${player.name} got ${square.name}`);
              player.account -= square.value;
              square.ownerId = player.id;
            }
          }

          if (player.type === 'demanding') {
            if (player.account >= square.value && square.rent > 50) {
              log(`player ${player.name} got ${square.name}`);
              player.account -= square.value;
              square.ownerId = player.id;
            }
          }

          if (player.type === 'cautious') {
            if (player.account - square.value > 80) {
              log(`player ${player.name} got ${square.name}`);
              player.account -= square.value;
              square.ownerId = player.id;
            }
          }

          if (player.type === 'random') {
            const willBuy = Math.floor(Math.random() * (2 - 1 + 1) + 1);
            if (player.account >= square.value && willBuy) {
              log(`player ${player.name} got ${square.name}`);
              player.account -= square.value;
              square.ownerId = player.id;
            }
          }
        } else {
          const owner = players.find((pl) => pl.id === square.ownerId);
          owner.account += square.rent;
          player.account -= square.rent;
          log(`player ${player.name} paid ${square.rent} to ${owner.name}`);

          if (player.account <= 0) {
            log(`player ${player.name} was eliminated`);
            player.status = false;
          }
        }
      }

      if (players.filter((pl) => pl.status).length < 2) {
        break;
      }
    }

    players.sort((a, b) => {
      if (a.account > b.account) return -1;
      if (a.account < b.account) return 1;
      return 0;
    });

    const winner = players[0];

    log(`WINNER: player ${winner.name} with account ${winner.account}`);

    const response: Record<string, any> = {
      players: players.map((pl) => pl.name),
      winner: winner.name,
    };

    return response;
  }
}
