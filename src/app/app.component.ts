import { AppService } from './app.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'cache-angular';
  result;
  constructor(private appservice: AppService) {
  }

  ngOnInit() {
    this.appservice.renewAfterTimer(this.appservice.getCall(), 1000).subscribe(result => {
      this.result = result;
      console.log(result);
    });
  }
  apiCall() {
    this.appservice.renewAfterTimer(this.appservice.getCall(), 1000).subscribe(result => {
      this.result = result;
      console.log(result);
    });
  }
}
