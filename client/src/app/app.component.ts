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

  ngOnInit() {

  }
}
