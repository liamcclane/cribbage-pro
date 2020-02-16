import { Card } from './card';
import { Player } from './player';

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
     * @param c is the card
     * @param d is the deck
     */
    giveToDeck(c: Card, d: Deck) {
        let ind = 0;
        for (let i = 0; i < this.order.length; i++) {
            if (this.order[i] === c) { ind = i; }
        }
        d.push(c);
        this.order.splice(ind, 1);
    }
    sortBySuit(){
        let sorted: Card[] = [];
        // let suitVal = {'s':1,'d':2,'h':3,'c':4};
        for(let c of this.order){
            if(c.suit == 's'){
                sorted.push(c);
            }
        }
        for(let c of this.order){
            if(c.suit == 'd'){
                sorted.push(c);
            }
        }
        for(let c of this.order){
            if(c.suit == 'c'){
                sorted.push(c);
            }
        }
        for(let c of this.order){
            if(c.suit == 'h'){
                sorted.push(c);
            }
        }
        this.order = sorted;
    }
    /**
     * this function empty the deck
     */
    empty() {
        this.order = [];
    }
    /**
     * this function only cross checks if it can be played into the count
     * @param c : card user is tring to play
     * @param d : this should always be the count deck
     */
    canPlayIntoCount(c:Card,d:Deck):boolean{
        if(c.cribbageVal + d.total() <= 31){
            return true;
        }
        return false;
    }
    /**
     * only get called after verification
     * @param d
     */
    findCPUCountCard(d: Deck):Card{
        let num = d.total();
        for(let c of this.order){
            if(c.val + num <= 31){
                return c;
            }
        }
    }
    /**
     * this fucntion should be called on the computers
     * @param d
     */
    canCPUPlayIntoCount(d:Deck):boolean{
        let num = d.total();
        for(let c of this.order){
            if(c.cribbageVal + num <= 31){
                return true;
            }
        }
        // if(c.cribbageVal + d.total() <= 31){
        //     return true;
        // }
        return false;
    }
    /**
     * loops though the deck and returns the total current count of the deck only
     * looking at active cards
     */
    total():number{
        let tot = 0;
        for(let c of this.order){
            if(c.isActive){
                tot += c.cribbageVal;
            }
        }
        return tot;
    }
    deactivate(){
        for(let c of this.order){
            if(c.isActive){
                c.isActive = false;
            }
        }
    }
}
