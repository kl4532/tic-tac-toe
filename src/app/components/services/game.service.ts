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

  findBestMove(fields: Field[], player: number): number {
    let bestMoveId = 0;
    let bestVal = -1000;

    fields.forEach((field: Field) => {
        if(field.val === 0) {
          field.val = 1;
          const moveVal = this.miniMax(fields, 0, player);
          field.val = 0;

          if (moveVal > bestVal) {
            bestMoveId = field.id;
            bestVal = moveVal;
          }
        }
      }
    )
    console.log(`Best move for ${player} ${bestMoveId}`);
    return bestMoveId;
  }

  miniMax(fields: Field[], depth: number, player: number): number {
    let score = this.evaluate(fields, player);
    // if(score === 10 || score === -10) {
    //   return score - ;
    // }
    if(score === 10) {
      return score - depth;
    }

    if(score === -10) {
      return score + depth;
    }

    if(!this.areMovesLeft(fields)) {
      return 0;
    }

    if(player === 1) {
      let best = -Infinity;
      fields.forEach(field => {
        if(field.val === 0) {
          field.val = 1;
          best = Math.max(best, this.miniMax(fields, depth + 1, 2));
          field.val = 0;
        }
      })
      console.log('Max', best);
      return best;
    } else {
      let best = Infinity;
      fields.forEach(field => {
        if(field.val === 0) {
          field.val = 2;
          best = Math.min(best, this.miniMax(fields, depth + 1, 1));
          field.val = 0;
        }
      })
      return best;
      console.log('Min', best);
    }

  }

  areMovesLeft(fields: Field[]) {
    return !!fields.find(f => f.val === 0);
  }

  changeCurrent(currentPlayer: number): number {
    return currentPlayer === 1 ? 2 : 1;
  }

}
