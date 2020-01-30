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
  mainDeck: Deck = new Deck();
  crib: Deck = new Deck();
  theCount: Deck = new Deck();
  theStartCard: Card = new Card('', 0);
  dealer: "Player";
  scoreDivs1tp40: number[] = [];
  scoreDivs40to80: number[] = [];
  scoreDivs80to120: number[] = [];
  /**
   * Round class
   * 
   * needs
   * two players
   * deck
   * start card
   * Judge
   * theCount deck
   * whos turn 
   * crib []
   */
  constructor() { }
  ngOnInit() {
    this.getTheDivs();
  }
  getTheDivs() {
    for (let i = -1; i < 121; i++) {
      if (i > 80) this.scoreDivs80to120.unshift(i);
      else if (i > 40) this.scoreDivs40to80.push(i);
      else this.scoreDivs1tp40.unshift(i);
    }
  }
  readyToBegin() {
    this.startGame();
    this.p1.scoreB = -1;
    this.p1.scoreA = 0;
    this.comp.scoreB = -1;
  }
  fakeCardIntoCount() {
    this.theCount.push(this.mainDeck.pop());
  }
  startGame() {
    this.startRound();
  }
  startRound() {
    // every round needs to clear all the global round vars
    this.mainDeck.empty();
    this.mainDeck.createDeck();
    this.crib.empty();
    this.theCount.empty();
    this.theStartCard = new Card('', 0);
    this.p1.hand.empty();
    this.deal6Cards();
  }
  deal6Cards() {
    for (let i = 0; i < 6; i++) {
      // console.log(this.p1);
      let cardForPlayer = this.mainDeck.pop()
      let cardForComp = this.mainDeck.pop()
      cardForPlayer.owner = this.p1;
      cardForPlayer.owner = this.comp;
      this.p1.hand.push(cardForPlayer);
      this.comp.hand.push(cardForComp);
    }
    let copy = new Deck();
    for (let i = 0; i < this.p1.hand.order.length; i++) {
      this.p1.hand.order[i].owner = this.p1;
      console.log("we are pushing a copy of");
      console.log(this.p1.hand.order[i]);
      console.log("in to the ghost hand");
      copy.push(this.p1.hand.order[i]);
    }
    this.p1.ghostHand = copy;
    let copy2 = new Deck();
    for (let i = 0; i < this.comp.hand.order.length; i++) {
      this.comp.hand[i].owner = this.comp;
      console.log("we are pushing a copy of");
      console.log(this.comp.hand.order[i]);
      console.log("in to the ghost hand");
      copy2.push(this.comp.hand.order[i]);
    }
    this.comp.ghostHand = copy2;
    // automatically have computer push into the crib
    this.crib.push(this.comp.hand.pop());
    this.comp.ghostHand.pop();
    this.crib.push(this.comp.hand.pop());
    this.comp.ghostHand.pop();
  }
  /**
   * This function deals with the human discarding their cards into either the crib
   * or the count,
   * We always save the index of the card that human is discarding
   * Then, if the length of the human HAND(not ghost hand) is > 4 discard into cribe changing both the 
   * ghost and actualy DB hand
   * Else make a copy of the card into theCrib and delete from ghost but SAVE the hand DB
   * @param c : this is a Card Object
   */
  discard(c: Card) {
    console.log(c);
    if (this.p1.hand.order.length > 4) {
      this.p1.hand.removeByCard(c);
      this.p1.ghostHand.removeByCard(c);
      if (this.p1.hand.order.length == 4) {
        this.getTheStartCard();
        // and starting the count 
      }
    } else {
      // checking if the player is trying to discard a blank space
      if (c.val == 0 || c.val == 20) return;
      // check whos turn it is
      //********************************************************************* */
      //********************************************************************* */
      // validate if you can play this card
      if(this.canPlayCard()){
        console.log("pushing this card into the count");
        console.log(c);
        this.theCount.push(c);
        this.p1.ghostHand.removeByCard(c);
      }
    }
  }
  canPlayCard(){
    return true;
  }
  movePegsRand() {
    let n = Math.floor((Math.random() * 10) + 1);
    let n2 = Math.floor((Math.random() * 10) + 1);
    console.log("moving player1 peg ****** " + n2);
    this.increaseScore(n, this.p1);
    console.log("moving the black peg -------" + n2);
    this.increaseScore(n2, this.comp);
  }
  /**
   * this function deals with moving Peg B to catch up with peg A
   * then inside it calls the movePegsTimeDelay function with correct time and timeDelay
   * @param scoreIncrease {number} this is the score increase from the round
   * @param p {Player} this is either the human or the computer
   */
  increaseScore(scoreIncrease: number, p: Player) {
    //move peg B
    let diff = p.scoreA - p.scoreB;
    console.log(diff);
    console.log("moving peg b " + diff + "times")
    this.movePegsTimeDelay(diff, p, 'B', 0);
    // now pegs are at the same place,
    // continue to move foward the given points
    console.log("moving peg a " + diff + "times with extra time delay")
    this.movePegsTimeDelay(scoreIncrease, p, 'A', diff);
  }
  clearScore() {
    this.p1.scoreA = 0;
    this.p1.scoreB = 0;
    this.comp.scoreA = 0;
    this.comp.scoreB = 0;
  }
  /**
   * This is nice that move the pegs smoothly every second
   * @param n : number that the peg will be moving
   * @param p : Player either human or computer
   * @param whichPeg : this is either 'A' or 'B'
   * @param addtionalTimeD : most of the time this will be zero while the B peg is catching
   */
  movePegsTimeDelay(n: number, p: Player, whichPeg: string, addtionalTimeD: number) {
    // doing some math to make the peg move faster
    let speedtime = 0;
    for (let i = 0; i < n; i++) {
      let myVar = setTimeout(() => {
        if (whichPeg == 'A') {
          p.scoreA++;
        } else {
          p.scoreB++
        }
      }, 500 * i + (addtionalTimeD * 500));
    }
  }
  getTheStartCard() {
    let card = this.mainDeck.order.pop();
    console.log("***THE START CARD IS***");
    console.log(card);
    this.theStartCard = card;
  }
}
