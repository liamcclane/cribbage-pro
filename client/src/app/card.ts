export class Card {
    suit:string ;
    val:number ;
    cribbageVal: number;
    imgConCat:string;
    cardWords:string ;
    constructor(suit:string, val:number) {
        this.suit = suit;
        this.val = val;
        if(val>=10){
            this.cribbageVal = 10;
        } else {
            this.cribbageVal = val;
        }
        this.getImgConCat(this.val,this.suit);
        this.getCardWords(this.val,this.suit);
    }

    getImgConCat(v:number,s:string){
        //the 14 is for making dummy cards
        let dict = {11:'j',12:'q',13:'k',0:'b2fv'};
        if(v>10){
            this.imgConCat = s+dict[v];
        } else if(v==14){
            this.imgConCat = dict[v];
        }else{
            this.imgConCat = s+v;
        }
    }
    getCardWords(n:number,s:string) {
        let valToString = ["Ace", "Two", "Three", "Four", "Five", "Six", "Seven",
            "Eight", "Nine", "Ten", "Jack", "Queen", "King"];
        let suitToWord = {s : "Spades", c:"Clubs", d: "Diamonds",h:"Hearts"};
        this.cardWords = `${valToString[n-1]} of ${suitToWord[s]}`;
    }
}
