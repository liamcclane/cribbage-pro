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
  showGoBtn = false;
  beginPegging = false;
  constructor() { }

  ngOnInit() {
    this.getPegs();
    this.startGame();
    this.crib.owner = this.comp;
    this.p1.scoreB = -1;
    this.p1.scoreA = 0;
    this.comp.scoreB = -1;
  }
  startGame() {
    this.mainDeck = new Deck();
    this.startRound();
  }
  startRound() {
    // this.mainDeck.createDeck();
    // or call
    this.testHands();
    this.crib.empty();
    this.theCount.empty();
    this.theStartCard = new Card('', 0);
    this.resetPlayersHands();
    this.outputText = '';
    this.roundCount = 0;
    this.roundIncrease = [0, 0, 0];
    this.revealCrib = false;
    this.showGoBtn = false;
    this.swapDealers();
    this.dealOutToPlayers();

  }
  /**
   * odds from the end are dealt to the player 
   * while evens are dealt to the computer
   * then this.mainDeck.order[0] will be the start card
   */
  testHands() {
    this.mainDeck.order = [
      new Card('c', 7), // theStartCard
      new Card('h', 1), // comp
      new Card('s', 6), 
      new Card('h', 1), // comp
      new Card('s', 5),
      new Card('h', 1), // comp
      new Card('s', 4),
      new Card('h', 1), // comp
      new Card('s', 3),
      new Card('h', 1), // comp
      new Card('s', 2),
      new Card('h', 1), // comp
      new Card('s', 1)
    ];
  }
  dealOutToPlayers() {
    for (let i = 0; i < 6; i++) {
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
    for (const c of this.p1.hand.order) {
      c.owner = this.p1;
      copy.push(c);
    }
    this.p1.ghostHand = copy;
    const copy2 = new Deck();
    for (const c of this.comp.hand.order) {
      c.owner = this.comp;
      copy2.push(c);
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
  returnToHand(card: Card) {
    console.log(card);
    this.theCount.removeByCard(card);
    this.p1.ghostHand.push(card);
    this.p1.hand.push(card);
  }
  verifiedStage() {
    for (let i = 0; i < 2; i++) {
      this.crib.push(this.theCount.order[i]);
    }
    this.theCount.order.length = 0;
    this.beginPegging = true;
    // get the start card
    // console.log(this.theStartCard);
    this.theStartCard = this.mainDeck.pop();
    console.log(this.theStartCard);
    if (this.theStartCard.val === 11) {
      // nibs occurs
      // give two points to who ever is the dealer
    }
    // below is a check for if the computer needs to play into the count first
    if (this.crib.owner === this.p1) {
      this.cpuPlay();
    }
  }
  discardIntoCount(card: Card) {
    // check if you can discard the card

    card.isActive = true;
    this.p1.ghostHand.removeByCard(card);
    this.roundCount += card.cribbageVal;
    this.theCount.push(card);

    // score the card
    const isEnd = this.endOfCount();

    if (isEnd) {
      // call judge and ready for next round
    } else {
      // cpu play
      this.cpuPlay();
    }

    this.check31();

    const p1CanPlay = this.p1.canPlayIntoCount(this.theCount);
    if (!p1CanPlay) {
      this.showGoBtn = true;
    }
  }
  playerSaysGo() {
    this.p1.go = true;
    this.showGoBtn = false;
    if (this.comp.go) {
      this.roundCount = 0;
      this.theCount.deactivate();
    }
    this.cpuPlay();
  }
  endOfCount() {
    if (this.theCount.order.length === 8) {
      return true;
    }
    return false;
  }

  cpuPlay() {


    // check if player has go and self has go
    // reset count

    const canPlay = this.comp.canPlayIntoCount(this.theCount);

    if (canPlay) {
      const card = this.comp.findCardForCount(this.theCount);
      card.isActive = true;
      // this.comp.ghostHand.removeByCard(card);
      this.roundCount += card.cribbageVal;
      this.theCount.push(card);

      this.check31();
    } else {
      // #message Computer says Go
      this.comp.go = true;
      if (this.p1.go) {
        this.roundCount = 0;
        this.theCount.deactivate();
        return;
      }
    }
    // check if display go button
    const p1CanPlay = this.p1.canPlayIntoCount(this.theCount);
    console.log('********** p1 can play')
    console.log(p1CanPlay);
    if (!p1CanPlay) {
      console.log('********** the go button should show')
      this.showGoBtn = true;
    }

  }
  check31() {
    if (this.roundCount === 31) {
      this.roundCount = 0;
      this.theCount.deactivate();
    }

    // check the last card and give player 2 points
    const lastCard = this.theCount.order[this.theCount.order.length - 1];
  }
  stageMe(card: Card) {
    console.log(card);
    this.p1.hand.removeByCard(card);
    this.p1.ghostHand.removeByCard(card);
    this.theCount.push(card);
  }
  swapDealers() {
    if (this.crib.owner === this.p1) {
      this.crib.owner = this.comp;
    } else {
      this.crib.owner = this.p1;
    }
  }
  resetPlayersHands() {
    this.p1.hand.empty();
    this.p1.ghostHand.empty();
    this.comp.hand.empty();
    this.comp.ghostHand.empty();
  }
  /**
   * / takes a card which has an owner
   * make it active
   * increases running count
   * push into count
   * gives points to card's owner
   * calls animations
   *  la fin
   * @param card:asldjf
   */
  pegCard(card: Card) {
    // takes a card which has an owner
    // make it active
    card.isActive = true;
    // increases running count
    // push into count
    this.roundCount += card.cribbageVal;
    this.theCount.push(card);
    // gives points to card's owner
    //
    // calls animations
    // la fin
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

  //   if (this.theCount.order.length === 0) {
  //     // computer goes first
  //     if (this.crib.owner === this.p1) {
  //       const c = this.comp.findCardForCount(this.theCount);
  //       this.pegCard(c);
  //       // this.theCount.push(c);
  //     }
  //   } else if (this.theCount.order.length < 8) {

  //     this.theCount.push(this.comp.ghostHand.pop());
  //   } else if (this.theCount.order.length === 8) {
  //     this.theCount.push(this.comp.ghostHand.pop());
  //   }
  //   console.log(this.theCount);
  // }
}