import { Component, OnInit } from '@angular/core';
import { Deck } from '../deck';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.css']
})
export class TutorialComponent implements OnInit {
  displayDeck: Deck;
  displayCards = [];

  constructor() { }

  ngOnInit() {
    this.displayDeck = new Deck();
    this.displayDeck.createDeck();
    // this.displayCards.push(this.displayDeck.pop());
    // this.displayCards.push(this.displayDeck.pop());

    // console.log(this.displayCards);
  }


  // getRandomCard() {
  //   const suits = ['h', 'c', 'd', 's'];
  //   const pips = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'j', 'q', 'k'];
  //   const cards = [];
  //   for (const suit in suits) {
  //       if (suit) {
  //           // tslint:disable-next-line:forin
  //           for (const pip in pips) {
  //               cards.push(suits[suit] + '' + pips[pip]);
  //           }
  //       }
  //   }
  //   console.log(cards);
  //   return cards[Math.floor(Math.random() * cards.length)] + '.png';
  // }

}
