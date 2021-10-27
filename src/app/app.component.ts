import {Component, OnInit} from '@angular/core';

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
  ngOnInit(): void {
    for(let i = 0; i<9; i++) {
      const field: Field = {
        id: i,
        val: 0
      }
      this.fields?.push(field);
    }
  }

  setValue(i: any) {
    this.fields[i].val = this.current;
  }
}
