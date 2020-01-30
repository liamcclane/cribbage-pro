import { Player } from './player';
import { Deck } from './deck';
import { Judge } from './judge';
import { Card } from './card';

export class Round {
    p1:Player;
    comp:Player;
    mainDeck: Deck;
    // judge: Judge;
    countDeck: Deck;
    startCard: Card ;
    cribb: Deck;
    /**
     * on initalization the round will
     */
    constructor(p:Player,c:Player){
        this.p1 = p;
        this.comp = c;
        this.mainDeck.createDeck();
        this.startCard = new Card('',0);
        this.startTheRound();
    }
    startTheRound(){
        this.deal6();
    }
    deal6(){
    }
}
