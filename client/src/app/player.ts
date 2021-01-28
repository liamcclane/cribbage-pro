import { Deck } from './deck';
import { Card } from './card';

export class Player {
    scoreA: number;
    scoreB: number;
    hand: Deck;
    ghostHand: Deck;
    name: string;
    go;
    constructor(n: string) {
        this.name = n;
        this.scoreA = 0;
        this.scoreB = 0;
        this.ghostHand = new Deck();
        this.hand = new Deck();
    }
    /**
     * this function should be called on either the computer or the
     * player, it checks to see if they have a vlaid card in their ghost
     * hand that they can play into the count witout busting
     * @param d :this deck should be theCount, it will only loop though
     * active cards to get the total
     */
    canPlayIntoCount(d: Deck): boolean {
        const tot = d.total();
        for (const card of this.ghostHand.order) {
            if (card.cribbageVal + tot <= 31 ) {
                return true;
            }
        }
        return false;
    }
    /**
     * we will only call this function of the computer to automate it to play into the pegging area
     * this function REMOVES the found card from the comps ghost hand and returns the card that needs
     * to be put into the count area
     * @param d : this needs to the theCount deck
     */
    findCardForCount(d: Deck): Card {
        const tot = d.total();
        const max = 31 - tot;
        let theCard: Card;
        for (const card of this.ghostHand.order) {
            if (card.cribbageVal === max) {
                this.ghostHand.removeByCard(card);
                // d.push(card);
                return card;
            } else if (card.cribbageVal < max) {
                theCard = card;
            }
        }
        this.ghostHand.removeByCard(theCard);
        return theCard;
    }
}
