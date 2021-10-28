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
      this.fields[i].val = this.current;
      this.checkGame(this.fields);
    }
  }

  checkGame(fields: Field[]) {
    const status = this.gameService.checkGameState(fields, this.current);
    switch (status) {
      case 1:
        setTimeout(() => {
          alert('X wins');
          this.fields = this.gameService.init();
        })
        break;
      case 2:
        setTimeout(() => {
          alert('O wins');
          this.fields = this.gameService.init();
        })
        break;
      case 3:
        setTimeout(() => {
          alert('DRAW!');
          this.fields = this.gameService.init();
        })
        break;
      default:
    }
  }

  reset() {
    this.fields = this.gameService.init();
  }
}
