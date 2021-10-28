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
  aiMode = false;

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.fields = this.gameService.init();
  }

  setValue(i: number, val: number) {
    if(!val) {
      this.current = this.current === 1 ? this.current = 2 : this.current = 1;
      this.fields[i].val = this.current;
      this.checkGame(this.fields);
    }
  }

  checkGame(fields: Field[]) {
    const status = this.gameService.checkGameState(fields, this.current);
    setTimeout(() => {
      console.log(
        'best move',
        this.gameService.findBestMove(this.fields, this.current)
    )
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

  reset() {
    this.fields = this.gameService.init();
    this.current = 0;

  }
}
