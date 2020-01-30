export class Judge {

  // scores the hand, currently takes an array of numbers
  scoreHand(arr: any) {
    // WE NEED TO KNOW IF THIS IS A CRIB
    // WE NEED TO KNOW WHICH IS THE START CARD
    // create a map of all 2, 3, and 4 card combos
    const combos: any = {
      2: [],
      3: [],
      4: []
    };
    const sizes = ['dubs', 'trips', 'quads'];
    // create a score object, with a total, and the matchups for each type
    const currentScore: any = {
      total: 0,
      fifteens: [],
      dupes: [],
      runs:[],
      flush:[],
      knobs:[]
    };
    // loop through and create maps for 2, 3, and 4 card combos
    for (const index of Object.keys(combos)) {
      combos[index] = this.generateCombo(arr, Number(index));
    }
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
    // count pairs
    for (let i = 0; i < combos['2'].length - 1; i++) {
      if (combos['2'][i][0] === combos['2'][i][1]) {
        currentScore.dupes.push(combos['2'][i]);
        currentScore.total += 2;
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
  sumHelper(arr: any) {
    let sum = 0;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < arr.length; i++) {
      sum += arr[i];
    }
    return sum;
  }
}