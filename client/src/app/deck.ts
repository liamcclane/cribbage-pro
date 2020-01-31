import { Card } from './card';
import { Player } from './player';
import { ThrowStmt } from '@angular/compiler';

export class Deck {
    order: Card[] = [];
    owner: Player;
    constructor() {
        // this.createOrderedDeck();
        // this.shuffle()
    }
    /**
     * This function creates 52 cards AND shuffels them
     */
    createDeck() {
        const d = [];
        const suits = ['s', 'd', 'c', 'h'];
        for (const s of suits) {
            for (let i = 1; i <= 13; i++) {
                const c = new Card(s, i);
                d.unshift(c);
            }
        }
        this.order = d;
        this.shuffle();
    }
    /**
     * quick shuffle function
     */
    shuffle() {
        this.order.sort(() => Math.random() - 0.5);
    }
    pop(): Card {
        if (this.order.length === 0) { return new Card('', 0); }
        return this.order.pop();
    }
    push(c: Card) {
        this.order.push(c);
    }
    /**
     * This function takes a card as a parameter and RETURNS
     * the sliced deck
     * @param c : This is the card we want removed out the of Deck
     */
    removeByCard(c: Card): void {
        if (this.order.length === 0) { return; }
        let ind = 0;
        for (let i = 0; i < this.order.length; i++) {
            if (this.order[i] === c) { ind = i; }
        }
        this.order.splice(ind, 1);
    }

    /**
     * takes a card and a deck and passes that card to the deck that was passed in okay? okay.
     * AND removes that card from called upon's players hand
     * @param c
     * @param d
     */
    giveToDeck(c: Card, d: Deck) {
        let ind = 0;
        for (let i = 0; i < this.order.length; i++) {
            if (this.order[i] === c) { ind = i; }
        }
        d.push(c);
        this.order.splice(ind, 1);
    }

    /**
     * this function empty the deck
     */
    empty() {
        this.order = [];
    }
}
