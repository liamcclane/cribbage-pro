import { Deck } from './deck'
import { ThrowStmt } from '@angular/compiler'
import { Card } from './card';

export class Player {
    score: number
    hand:Card[]=[];
    ghostHand:Card[]=[];
    name:string
    constructor(n:string){
        this.name = n;
        this.score = 0;
    }
    // doToGhost(){
    //     this.ghostHand=this.hand;
    // }
}
