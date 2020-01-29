import { Card } from './card';
import { Player } from './player';

export class Deck {
    order: Card[]=[];
    owner:Player;
    constructor(){
        this.createOrderedDeck();
        this.shuffle()
    }
    createOrderedDeck(){
        let d = [];
        let suits = ['s','d','c','h'];
        for(let s of suits){
            for(let i = 1; i<=13; i++){
                let c = new Card(s,i);
                d.unshift(c);
            }
        }
        this.order = d;
    }
    shuffle(){
        this.order.sort(()=>Math.random()-0.5);
    }
    empty(){
        this.order=[];
    }
}
