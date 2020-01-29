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
  theCount: Card[] = [];
  dealer: "Player";
  scoreDivs: number[] = [];

  constructor() { }

  ngOnInit() {
    this.startGame();
    for (let i = 0; i < 100; i++) {
      this.scoreDivs.push(i);
    }
    this.p1.scoreA = 5;
    this.p1.scoreB = 2;
  }
  startGame() {
    this.startRound();
  }
  startRound() {
    //every round needs to clear all the global 'decks'
    // this.deck = new Deck();
    // this.crib = [];
    // this.theCount = [];
    this.deal6Cards();
  }
  deal6Cards() {
    for (let i = 0; i < 6; i++) {
      // console.log(this.p1);
      this.p1.hand.push(this.deck.order.pop());
      this.comp.hand.push(this.deck.order.pop());
    }
    let copy: Card[] = []
    for (let i = 0; i < this.p1.hand.length; i++) {
      copy.push(this.p1.hand[i]);
    }
    this.p1.ghostHand = copy;
    console.log(this.p1.ghostHand);
    console.log(this.p1.hand);
  }
  discard(c: Card) {
    console.log(c);
    //loop though the players hand and find the index of which one you 
    // are adding to the crib
    let ind: number;
    for (let i = 0; i < this.p1.hand.length; i++) {
      if (this.p1.hand[i] == c) {
        ind = i;
      }
    }
    if (this.p1.hand.length > 4) {
      console.log("-----------inside if--------");
      //discard into the crib EMPTYING out of the players hand
      // push into the crib 
      this.crib.push(c);
      this.p1.hand.splice(ind, 1);
      this.p1.ghostHand.splice(ind, 1);
    } else {
      // checking if the player is trying to discard a blank space
      if (c.val == 14) {
        return;
      }
      // ghosthand
      // check who's turn it is
      // validate if you can play this card
      this.theCount.push(c);
      for (let i = 0; i < this.p1.ghostHand.length; i++) {
        if (this.p1.ghostHand[i] == c) {
          this.p1.ghostHand[i] = new Card('', 14);
        }
      }
    }
  }
  movePegsRand() {
    let n = Math.floor((Math.random() * 10) + 1);
    let n2 = Math.floor((Math.random() * 10) + 1);
    console.log("moving player1 peg ", n2);
    this.catchPegBUp(n, this.p1);
    console.log("moving the black peg ", n2);
    this.catchPegBUp(n2, this.comp);
  }
  catchPegBUp(scoreIncrease: number, p: Player) {
    //move the back peg up till they are equal
    let oldscore=p.scoreA
    while (p.scoreB!=oldscore){
      console.log("Am I Stuck Here???");
      let diff = p.scoreA-p.scoreB;
      this.movePegsTimeDelay(diff,p,'B');
    }
    console.log("yay we are equal")
    // now pegs are at the same place,
    // continue to move foward the given points
    this.movePegsTimeDelay(scoreIncrease,p,'A');
  }
  clearScore() {
    this.p1.scoreA = 0;
    this.p1.scoreB = 0;
    this.comp.scoreA = 0;
    this.comp.scoreB = 0;
  }
  movePegsTimeDelay(n: number, p: Player, whichPeg: string) {
    for (let i = 0; i < n; i++) {
      let myVar = setTimeout(() => {
        if (whichPeg == 'A'){
          console.log("increasing A")
          p.scoreA++;
        } else {
          console.log("increasing B")
          p.scoreB++
        };
        // if(p===this.p1){
        //   if(whichPeg =='A') this.p1.scoreA++;
        //   else this.p1.scoreB++;
        //   // if(this.p1.scoreA<this.p1.scoreB){
        //   //   // this will move the A and B to the same number
        //   //   let diff = this.p1.scoreB-this.p1.scoreA;
        //   //   this.movePegsTimeDelay(diff,this.p1);
        //   //   // this.p1.scoreA++
        //   // } else if(this.p1.scoreA>this.p1.scoreB) {
        //   //   let diff = this.p1.scoreA-this.p1.scoreB;
        //   //   this.movePegsTimeDelay(diff,this.p1);
        //   // } else{
        //   //   this.p1.scoreA++
        //   // }
        // } else {
        //   if(whichPeg=='A') this.comp.scoreA++;
        //   else this.comp.scoreB++;
        // }
      }, 1000 * i);
    }
  }
}
