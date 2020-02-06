import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  scoreDivs1tp40: number[] = [];
  scoreDivs40to80: number[] = [];
  scoreDivs80to120: number[] = [];

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
    'ooooo spoooky!'
  ];

  messageOfTheDay = this.messages[Math.floor(Math.random() * this.messages.length)];

  ngOnInit() {
    console.log(this.messageOfTheDay);
  }
}
