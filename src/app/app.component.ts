import {Component, OnInit} from '@angular/core';
import {GameService} from "./components/services/game.service";

export interface Field {
  id: number;
  val: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  fields: Field[] = [];
  current = 0;
  isAiMode = true;
  isAiMove = false;
  aiFirst = false;

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.fields = this.gameService.init();
    // if(this.aiFirst) {
    //   this.isAiMove = true;
    //   this.aiMove();
    // }
  }

  setValue(i: number, val: number) {
    if(!val) {
      this.current = this.current === 1 ? this.current = 2 : this.current = 1;
      this.fields[i].val = this.current;
      this.isAiMove = true;
      this.checkGame(this.fields);
      if(this.isAiMode)
        this.aiMove();
    }
  }

  checkGame(fields: Field[]) {
    const status = this.gameService.checkGameState(fields, this.current);
    setTimeout(() => {
      switch (status) {
        case 1:
          alert('X wins');
          this.reset();
          break;
        case 2:
          alert('O wins');
          this.reset();
          break;
        case 3:
          alert('DRAW!');
          this.reset();
          break;
        default:
      }
    })
  }

  aiMove() {
    setTimeout(()=> {
      if(this.isAiMode && this.isAiMove) {
        this.isAiMove = false;
        this.current = this.current === 0 ? 2 : this.gameService.changeCurrent(this.current);
        const fieldId = this.gameService.findBestMove(this.fields, this.gameService.changeCurrent(this.current));
        this.fields[fieldId].val = this.current;
        this.checkGame(this.fields);
      }
    },100)
  }

  reset() {
    this.current = 0;
    this.isAiMove = false;
    this.fields = this.gameService.init();
    this.aiFirst = !this.aiFirst;
    if(this.aiFirst) {
      this.isAiMove = true;
      this.aiMove();
    }
  }
}
