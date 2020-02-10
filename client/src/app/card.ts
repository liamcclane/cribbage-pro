import { Player } from './player';

export class Card {
    suit: string ;
    val: number;
    cribbageVal: number;
    imgConCat: string;
    cardWords: string;
    owner: Player;
    isStart;
    isActive:boolean;
    /**
     * When constucting a Card please pass in the single charater suit
     * and then the val for the card, if you want a facedown card put val 0
     * if you want an empty space card put 20
     * @param suit : single charater like 's' which stands for "Spades"
     * @param val : number
     */
    constructor(suit: string, val: number) {
        this.suit = suit;
        this.val = val;
        if (val >= 10) {
            this.cribbageVal = 10;
        } else {
            this.cribbageVal = val;
        }
        this.getImgConCat(this.val, this.suit);
        this.getCardWords(this.val, this.suit);
    }
    /**
     * this function takes two parameters and makes a nice concatination for us to use on the template
     * I added an extra value 0 to be a face down card and -1 to be an empty space
     * @param v : this is the value of the card 1-13, with 11='Jack'...and so on
     * @param s : this is the single character reprensenting 'c'="clubs"... and so on
     */
    getImgConCat(v: number, s: string) {
        // the 14 is for making dummy cards
        const dict = {11: 'j', 12: 'q' , 13: 'k', 0: 'b2fv.png', 20: 'blank'};
        // const dict2 = {11: 'j', 12: 'q' , 13: 'k', 0: 'b2fv.png', 20: 'blank'};
        this.imgConCat += "cardAssets/PNG-cards-1.3/"
        if ( v > 10) {
            this.imgConCat += s + dict[v];
        } else if (v === 0 || v === 20) {
            this.imgConCat += dict[v];
        } else {
            this.imgConCat += s + v +'.png';
        }
    }
    /**
     * This fucntion attaches a nice full sentance for each card
     * @param n :takes the actual card value
     * @param s :takes the character that represents the suit
     */
    getCardWords(n: number, s: string) {
        const valToString = ['Ace', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven',
            'Eight', 'Nine', 'Ten', 'Jack', 'Queen', 'King'];
        const suitToWord = {s : 'Spades', c: 'Clubs', d: 'Diamonds', h: 'Hearts'};
        this.cardWords = `${valToString[n - 1]} of ${suitToWord[s]}`;
    }
}
