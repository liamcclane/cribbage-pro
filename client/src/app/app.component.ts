import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  messages = [
    'good to the last drop!',
    'better late than never!',
    'git pull or die!',
    'non toxic!',
    'certified fresh!',
    'not your mother\'s cribbage!',
    'dolphin free!',
    'no trees harmed!',
    'as seen on TV!',
    'daaaaaamn daniel!',
    'locally grown!',
    'caution filling is hot!',
    'better than free!',
    'viewer discretion is advised!',
    'drug free!',
    'no additional additives!',
    'better than a kick in the butt!',
    'oh no the snack table!',
    'easy peasy lemon squeezy!',
    'difficult difficult lemon difficult!',
    'somewhat better than sex!',
    'tobacco free since \'93!',
    'old timey fun timey!',
    'awesome possum!',
    'rather nifty!',
    'ayyy lmao',
    'ready set go!',
    'quality pegging!',
    'oh god oh frick',
    'sea monkeys are not primates!',
    'no butts about it!',
    'more bean for your buck!',
    'hey you kids, get off my lawn!',
    'that\'s snazzy!',
    'please subscribe!',
    'open sourced!',
    'independently owned and operated!',
    'ooooo spoooky!',
    'and that\'s all she wrote!'
  ];
  scorePegHole80to120: number[] = [];
  scorePegHole40to80: number[] = [];
  scorePegHole1to40: number[] = [];
  scorePegHole1to30: number[] = [];
  scorePegHole30to60: number[] = [];
  scorePegHole60to90: number[] = [];
  scorePegHole90to120: number[] = [];
  scorePegHoles: number[] = [];
  messageOfTheDay = this.messages[Math.floor(Math.random() * this.messages.length)];

  ngOnInit() {
    console.log(this.messageOfTheDay);
    this.getPegs();
    // console.log(this.scorePegHole1tp40);
  }
  getPegs() {
    for (let i = -2; i <= 121; i++) {
      this.scorePegHoles.push(i);
      if (i > 80) {
        this.scorePegHole80to120.push(i);
      } else if (i > 40) {
        this.scorePegHole40to80.push(i);
      } else {
        this.scorePegHole1to40.push(i);
      }

      if (i > 90) {
        this.scorePegHole90to120.push(i);
      } else if (i > 60) {
        this.scorePegHole60to90.push(i);
      } else if (i > 30) {
        this.scorePegHole30to60.push(i);
      } else {
        this.scorePegHole1to30.push(i);
      }
    }
  }
}
