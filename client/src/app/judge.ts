import { renderFlagCheckIfStmt } from '@angular/compiler/src/render3/view/template';

export class Judge {

  constructor() {}

  // scores the hand, currently takes an array of numbers
  countHand(cards: any, isCrib: boolean) {
    console.log(cards);




    // suit:string ;
    // val:number ;
    // cribbageVal: number;

    // WE NEED TO KNOW IF THIS IS A CRIB
    // WE NEED TO KNOW WHICH IS THE START CARD
    // create a map of all 2, 3, and 4 card combos
    // let arr = [];
    // console.log(cards);
    // return;

    let checkThrees = true;
    let tempTotal = 0;

    const cardsValue = [];
    const cribbageValue = [];
    const combos: any = {
      2: [],
      3: [],
      4: []
    };

    const runs: any = {
      2: [],
      3: [],
      4: []
    };

    // create a score object, with a total, and the matchups for each type
    const currentScore: any = {
      total: 0,
      fifteens: [],
      dupes: [],
      runs: [],
      flush: [],
      knobs: []
    };

    // cardsValue.sort((n1, n2) => n1 - n2);
    // cribbageValue.sort((n1, n2) => n1 - n2);

    for (const card of cards) {
      cribbageValue.push(card.val);
      cardsValue.push(card.cribbageVal);
    }

    // cribbageValue.sort();
    // cardsValue.sort();

    // console.log(cribbageValue);
    // console.log(cardsValue);

    // return;


    // loop through and create maps for 2, 3, and 4 card combos
    for (const index of Object.keys(combos)) {
      combos[index] = this.generateCombo(cardsValue, Number(index));
    }

    for (const index of Object.keys(runs)) {
      runs[index] = this.generateCombo(cribbageValue, Number(index));
    }

    // console.log(combos);
    // console.log(runs);
    // return;

    // count 15s
    for (const size of Object.keys(combos)) {
      // tslint:disable-next-line:prefer-for-of
      for (let x = 0; x < combos[size].length; x++) {
        const sum = this.sumHelper(combos[size][x]);
        if (sum === 15) {
          currentScore.fifteens.push(combos[size][x]);
          currentScore.total += 2;
        }
      }
    }

    // count 5 card 15 edge
    for (const card of cribbageValue) {
      tempTotal += card;
    }

    if (tempTotal === 15) {
      currentScore.total += 2;
      currentScore.fifteens.push(cribbageValue);
    }



    // count pairs
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < runs['2'].length; i++) {
      if (runs['2'][i][0] === runs['2'][i][1]) {
        currentScore.dupes.push(runs['2'][i]);
        currentScore.total += 2;
      }
    }

    console.log(cribbageValue);

    // check five card runs
    if (this.isRun( cribbageValue )) {
      checkThrees = false;
      currentScore.runs.push(cribbageValue);
      currentScore.total += 5;
    } else {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < runs['4'].length; i++) {
        // then check four card runs
        if (this.isRun(runs['4'][i])) {
          checkThrees = false;
          currentScore.runs.push(runs['4'][i]);
          currentScore.total += 4;
        }
      }
    }

    // finally check three card runs;
    if (checkThrees) {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < runs['3'].length; i++) {
        if (this.isRun(runs['3'][i])) {
          currentScore.runs.push(runs['3'][i]);
          currentScore.total += 3;
        }
      }
    }

    if (isCrib && this.isFlush(cards)) {
      currentScore.total += 5;
      currentScore.flush.push(cards);
    } else if (this.isFourFlush(cards)) {
      currentScore.total += 4;
      currentScore.flush.push(cards);
    }

    if (cards[cards.length - 1].val === 11) {
      if (this.isKnobs(cards)) {
        currentScore.total += 1;
        currentScore.knobs.push(true);
      }
    }
    // log it
    console.log(combos);
    console.log(currentScore);
    // void
  }
  // recursive wrapper function for generate combos, creates r sized combos from arr.length
  generateCombo(arr: any, r: number) {
    const data: any = [];
    const n = arr.length;
    const output: any = [];
    this.combinationUtil(arr, n, r, 0, data, 0, output);
    return output;
  }
  // recursive utility function
  combinationUtil(arr: any, n: number, r: number, index: number, data: any, i: number, output: any) {
    if (index === r) {
      const temp = [];
      for (let j = 0; j < r; j++) {
        temp.push(data[j]);
      }
      output.push(temp);
      return;
    }

    if (i >= n) {
      return;
    }
    data[index] = arr[i];
    this.combinationUtil(arr, n, r, index + 1, data, i + 1, output);
    this.combinationUtil(arr, n, r, index, data, i + 1, output);
  }
  // helper that sums array
  sumHelper(arr: any): number {
    let sum = 0;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < arr.length; i++) {
      sum += arr[i];
    }
    return sum;
  }

  isRun(arr: any): boolean {
    arr.sort((n1, n2) => n1 - n2);
    console.log(arr);
    let run = true;
    for (let i = 1; i < arr.length; i++) {
      if (arr[i - 1] + 1 !== arr[i]) {
        // console.log('run failed!');
        run = false;
      }
    }
    return run;
  }

  isFlush(cards): boolean {
    let flush = true;
    const suit = cards[0].suit;

    for (let i = 1; i < cards.length; i++) {
      if (cards[i].suit !== suit) {
        flush = false;
      }
    }

    return flush;
  }

  isFourFlush(cards: any) {
    const map = {
      s: 0,
      h: 0,
      c: 0,
      d: 0
    };

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < cards.length; i++) {
      map[cards[i].suit] += 1;
    }

    for (const suit of Object.keys(map)) {
      if (map[suit] === 4) {
        return true;
      }
    }
    return false;
  }

  isKnobs(cards: any) {
    let knobs = false;
    const knobSuit = cards[cards.length - 1].suit;
    for (let i = 0; i < cards.length - 1; i++) {
      if (knobSuit === cards[i].suit) {
        knobs = true;
      }
    }

    return knobs;
  }
}
