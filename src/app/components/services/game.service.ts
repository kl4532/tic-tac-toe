import { Injectable } from '@angular/core';
import {Field} from "../../app.component";
import {BehaviorSubject} from "rxjs";

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

  checkGameState(fields: Field[], lastMark: number): number {
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
      return lastMark
    }

    const isDraw = fields.find(f => f.val === 0);

    if(!isDraw) {
      return 3;
    }

    return 0;
  }

}
