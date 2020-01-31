import { Deck } from './deck'
import { ThrowStmt } from '@angular/compiler'
import { Card } from './card';

export class Player {
    scoreA: number
    scoreB: number
    hand:Deck;
    ghostHand:Deck;
    name:string
    constructor(n:string){
        this.name = n;
        this.scoreA = 0;
        this.scoreB = 0;
        this.ghostHand = new Deck();
        this.hand = new Deck();
    }
    // doToGhost(){
    //     this.ghostHand=this.hand;
    // }
}
