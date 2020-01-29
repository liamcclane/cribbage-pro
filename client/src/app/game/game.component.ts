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
    let ind: number;
    for (let i = 0; i < this.p1.hand.length; i++) {
      if (this.p1.hand[i] == c) {
        ind = i;
      }
    }
    if (this.p1.hand.length > 4) {
      console.log("-----------inside if--------");
      this.crib.push(c);
      this.p1.hand.splice(ind, 1);
      this.p1.ghostHand.splice(ind, 1);
    } else {
      // checking if the player is trying to discard a blank space
      if (c.val == 0) {
        return;
      }
      // ghosthand
      // check who's turn it is
      // validate if you can play this card
      this.theCount.push(c);
      for (let i = 0; i < this.p1.ghostHand.length; i++) {
        if (this.p1.ghostHand[i] == c) {
          this.p1.ghostHand[i] = new Card('', 0);
        }
      }
    }
  }
  movePegsRand() {
    let n = Math.floor((Math.random() * 10) + 1);
    let n2 = Math.floor((Math.random() * 10) + 1);
    console.log("moving player1 peg ", n2);
    this.increaseScore(n, this.p1);
    console.log("moving the black peg ", n2);
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
    let diff = p.scoreA-p.scoreB;
    console.log(diff);
    console.log("moving peg b "+diff+ "times")
    this.movePegsTimeDelay(diff,p,'B',0);
    // now pegs are at the same place,
    // continue to move foward the given points
    console.log("moving peg a "+diff+ "times with extra time delay")
    this.movePegsTimeDelay(scoreIncrease,p,'A',diff);
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
  movePegsTimeDelay(n: number, p: Player, whichPeg: string,addtionalTimeD:number) {
    for (let i = 0; i < n; i++) {
      let myVar = setTimeout(() => {
        if (whichPeg == 'A'){
          p.scoreA++;
        } else {
          p.scoreB++
        } 
      }, 1000 * i+(addtionalTimeD*1000));
    }
  }
}
