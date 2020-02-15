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
  // will only get reset at END scores of 121
  p1: Player = new Player('Player 1');
  comp: Player = new Player('Computer');
  judge: Judge = new Judge();
  discarded = false;
  gameStarted = false;
  // things that get reset per round
  mainDeck: Deck = new Deck();
  crib: Deck = new Deck();
  theCount: Deck = new Deck();
  theStartCard: Card = new Card('', 0);
  roundIncrease: number[] = [0, 0, 0];
  revealCrib = false;
  outputText: string;
  roundCount: number;
  beginPegging: boolean = false;
  constructor() { }

  ngOnInit() {
    this.getPegs();
    this.startGame();
    this.crib.owner = this.comp;
    this.p1.scoreB = -1;
    this.p1.scoreA = 0;
    this.comp.scoreB = -1;
  }
  startGame(){
    this.mainDeck = new Deck();
    this.startRound();
  }
  startRound(){
    this.mainDeck.createDeck();
    this.crib.empty();
    this.theCount.empty();
    this.theStartCard = new Card('',0);
    this.resetPlayersHands();
    this.outputText = '';
    this.roundCount = 0;
    this.roundIncrease = [0,0,0];
    this.revealCrib = false;
    this.swapDealers();
    this.dealOutToPlayers();
  }
  dealOutToPlayers(){
    for (let i = 0; i < 6 ; i++) {
      // console.log(this.p1);
      const cardForPlayer = this.mainDeck.pop();
      const cardForComp = this.mainDeck.pop();
      cardForPlayer.owner = this.p1;
      cardForPlayer.owner = this.comp;
      this.p1.hand.push(cardForPlayer);
      this.comp.hand.push(cardForComp);
    }
    const copy = new Deck();
    // tslint:disable-next-line:prefer-for-of
    for(let c of this.p1.hand.order){
      c.owner = this.p1;
      copy.push(c)
    }
    this.p1.ghostHand = copy;
    const copy2 = new Deck();
    for(let c of this.comp.hand.order){
      c.owner = this.comp;
      copy2.push(c)
    }
    this.comp.ghostHand = copy2;
    // automatically have computer push into the crib
    this.crib.push(this.comp.hand.pop());
    this.comp.ghostHand.pop();
    this.crib.push(this.comp.hand.pop());
    this.comp.ghostHand.pop();
    // this.p1.hand.sortBySuit();
    // this.p1.ghostHand.sortBySuit();
    // this.comp.hand.sortBySuit();
    // this.comp.ghostHand.sortBySuit();
  }
  returnToHand(card:Card){
    console.log(card);
    this.theCount.removeByCard(card);
    this.p1.ghostHand.push(card);
    this.p1.hand.push(card);
  }
  verifiedStage(){
    for(let i=0; i< 2; i++){
      this.crib.push(this.theCount.order[i]);
    }
    this.theCount.order.length = 0;
    this.beginPegging = true;
    // this.p1.hand.sortBySuit();
    this.peggingTime();
  }
  peggingTime(){
    if(this.theCount.order.length == 0){
      // computer goes first
      if(this.crib.owner == this.p1){
        let c = this.comp.findCardForCount(this.theCount);
        this.theCount.push(c);
      }
    }
    else if(this.theCount.order.length < 8){
      this.theCount.push(this.comp.ghostHand.pop());
    } else if(this.theCount.order.length == 8){
      this.theCount.push(this.comp.ghostHand.pop());
    }
    console.log(this.theCount)
  }
  dicardIntoCount(card:Card){
    this.p1.ghostHand.removeByCard(card);
    this.theCount.push(card);
    this.peggingTime();
  }
  stageMe(card:Card){
    console.log(card);
    this.p1.hand.removeByCard(card);
    this.p1.ghostHand.removeByCard(card);
    this.theCount.push(card);
  }
  swapDealers(){
    if(this.crib.owner == this.p1){
      this.crib.owner = this.comp;
    } else {
      this.crib.owner = this.p1;
    }
  }
  resetPlayersHands(){
    this.p1.hand.empty();
    this.p1.ghostHand.empty();
    this.comp.hand.empty();
    this.comp.ghostHand.empty();
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
