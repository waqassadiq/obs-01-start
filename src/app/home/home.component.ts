import { Component, OnDestroy, OnInit } from '@angular/core';

import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  // when using custom subscription, need to store the subscription to later destroy it
  // otherwise, it would keep on running in the background, even if you are no more on that page.
  private firstObsSubscription: Subscription;

  constructor() { }
  

  ngOnInit() {
    // writing our own obserable
    this.firstObsSubscription = interval(1000).subscribe(count => {
      console.log(count);
    })
  }

  ngOnDestroy(): void {
    // it is to prevent memory leaks.
    this.firstObsSubscription.unsubscribe();
    
  }

}
