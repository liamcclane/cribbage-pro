import { Component, OnInit } from '@angular/core';
import { Player } from '../player';
import { Deck } from '../deck';
import { Card } from '../card';
// import { ActivatedRoute } from '@angular/router';
// import { Route } from '@angular/compiler/src/core';
// import { ThrowStmt } from '@angular/compiler';
// import { areAllEquivalent } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  p1: Player = new Player('p1');
  comp: Player = new Player('comp');
  deck: Deck = new Deck();
  crib: Card[] = [];
  dealer: "Player";
  

  constructor() { }

  ngOnInit() {
    this.startNewGame();
  }
  startNewGame() {
    this.startNewRound();
  }
  startNewRound() {
    this.deal6Cards();
  }
  deal6Cards() {
    for (let i = 0; i < 6; i++) {
      // console.log(this.p1);
      this.p1.hand.push(this.deck.order.pop());
      this.p1.doToGhost();
      this.comp.hand.push(this.deck.order.pop());
      this.comp.doToGhost();
    }
    console.log(this.p1.ghostHand);
  }
  discard(c: Card) {
    console.log(c);
    if (this.p1.hand.length > 4) {
      //discard into the crib EMPTYING out of the players hand
      //loop though the players hand and find the index of which one you 
      // are adding to the crib
      let ind: number;
      for (let i = 0; i < this.p1.hand.length; i++) {
        if (this.p1.hand[i] == c) {
          console.log("found it");
          // push into the crib 
          this.crib.push(c);
          ind = i;
        }
      }
      this.p1.hand.splice(ind, 1);
    } else {
      // ghosthand
      // validate if 
    }
  }

}
