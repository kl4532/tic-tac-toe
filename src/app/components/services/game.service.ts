import { Injectable } from '@angular/core';
import {Field} from "../../app.component";

@Injectable({
  providedIn: 'root'
})
export class GameService {
  constructor() { }

  init(): Field[] {
    let fields = []
    for(let i = 0; i<9; i++) {
      const field: Field = {
        id: i,
        val: 0
      }
      fields.push(field);
    }
    return fields;
  }

  checkGameState(fields: Field[], lastPlayer: number = 1): number {
    if(
      fields[0].val === fields[1].val && fields[0].val === fields[2].val && fields[0].val !== 0 ||
      fields[3].val === fields[4].val && fields[3].val === fields[5].val && fields[3].val !== 0 ||
      fields[6].val === fields[7].val && fields[6].val === fields[8].val && fields[6].val !== 0 ||

      fields[0].val === fields[3].val && fields[0].val === fields[6].val && fields[0].val !== 0 ||
      fields[1].val === fields[4].val && fields[1].val === fields[7].val && fields[1].val !== 0 ||
      fields[2].val === fields[5].val && fields[2].val === fields[8].val && fields[2].val !== 0 ||

      fields[0].val === fields[4].val && fields[0].val === fields[8].val && fields[0].val !== 0 ||
      fields[2].val === fields[4].val && fields[2].val === fields[6].val && fields[2].val !== 0
    ) {
      return lastPlayer
    }

    const isDraw = fields.find(f => f.val === 0);

    if(!isDraw) {
      return 3;
    }

    return 0;
  }

  evaluate(fields: Field[], lastPlayer: number): number {
    const result = this.checkGameState(fields, lastPlayer);
    if(result === 1) {
      return 10;
    } else if(result === 2) {
      return -10;
    }
    return 0;
  }

  findBestMove(fields: Field[], player: number): Field | null{
    let bestMove = null;
    let bestVal = -Infinity;

    fields.forEach((field: Field) => {
        if(field.val === 0) {
          field.val = 1;
          const moveVal = this.miniMax(fields, 1, player);
          field.val = 0;

          if (moveVal > bestVal) {
            bestMove = field;
            bestVal = moveVal;
          }
        }
      }
    )
    return bestMove;
  }

  miniMax(fields: Field[], depth: number, player: number): number {
    let score = this.evaluate(fields, player);
    if(score === 10 || score === -10 || score === 0) {
      return score;
    }

    if(player === 1) {
      let best = -Infinity;
      fields.forEach(field => {
        if(field.val === 0) {
          field.val = 1;
          const currentPlayer = player === 1 ? 2 : 1;
          best = Math.max(best, this.miniMax(fields, depth + 1, currentPlayer))
          field.val = 0;
        }
      })
      return best;
    } else {
      let best = Infinity;
      fields.forEach(field => {
        if(field.val === 0) {
          field.val = 2;
          const currentPlayer = player === 1 ? 2 : 1;
          best = Math.max(best, this.miniMax(fields, depth + 1, currentPlayer))
          field.val = 0;
        }
      })
      return best;
    }
  }

}
