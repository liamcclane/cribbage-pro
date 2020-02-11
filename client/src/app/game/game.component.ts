import { Component, OnInit, ElementRef } from '@angular/core';
import { Player } from '../player';
import { Deck } from '../deck';
import { Card } from '../card';
import { Judge } from '../judge';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  scorePegHole80to120: number[] = [];
  scorePegHole40to80: number[] = [];
  scorePegHole1to40: number[] = [];
  scorePegHole1to30: number[] = [];
  scorePegHole30to60: number[] = [];
  scorePegHole60to90: number[] = [];
  scorePegHole90to120: number[] = [];
  scorePegHoles: number[] = [];
  // messageOfTheDay = this.messages[Math.floor(Math.random() * this.messages.length)];

  constructor() { }

  ngOnInit() {
    this.getPegs();

  }

  getPegs() {
    for (let i = -2; i <= 121; i++) {
      this.scorePegHoles.push(i);
      if (i > 80) {
        this.scorePegHole80to120.push(i);
      } else if (i > 40) {
        this.scorePegHole40to80.push(i);
      } else {
        this.scorePegHole1to40.push(i);
      }

      if (i > 90) {
        this.scorePegHole90to120.push(i);
      } else if (i > 60) {
        this.scorePegHole60to90.push(i);
      } else if (i > 30) {
        this.scorePegHole30to60.push(i);
      } else {
        this.scorePegHole1to30.push(i);
      }
    }
  }

}
