import { Deck } from './deck'
import { ThrowStmt } from '@angular/compiler'
import { Card } from './card';

export class Player {
    score: number
    scoreConCat: string
    hand:Card[]=[];
    ghostHand:Card[]=[];
    name:string
    constructor(n:string){
        this.name = n;
        this.score = 0;
        this.scoreConCat = `margin-left:${this.score * 10}px;`;
    }
    // doToGhost(){
    //     this.ghostHand=this.hand;
    // }
}
