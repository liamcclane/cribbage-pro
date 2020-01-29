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

  constructor() { }

  ngOnInit() {
    this.startGame();
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
    let copy:Card[] = []
    for(let i = 0; i<this.p1.hand.length;i++){
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
      if(c.val==14){
        return;
      }
      // ghosthand
      // check who's turn it is
      // validate if you can play this card
      this.theCount.push(c);
      for(let i = 0; i<this.p1.ghostHand.length;i++){
        if(this.p1.ghostHand[i]==c){
          this.p1.ghostHand[i] = new Card('',14);
        }
      }
    }
  }
  movePegs(){
    let n = Math.floor((Math.random() * 10) + 1);
    let n2 = Math.floor((Math.random() * 10) + 1);
    this.p1.score += n;
    this.comp.score +=n2;
  }
  clearScore(){
    this.p1.score =0;
    this.comp.score =0;
  }
  moveBlack(){
    this.comp.score ++;
  }
  moveGold(){
    this.p1.score ++;
  }
}
