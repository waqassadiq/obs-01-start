import { Component, OnDestroy, OnInit } from '@angular/core';

import { interval, Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  // when using custom subscription, need to store the subscription to later destroy it
  // otherwise, it would keep on running in the background, even if you are no more on that page.
  private firstObsSubscription: Subscription;
  private customeSubscription: Subscription;

  constructor() { }
  

  ngOnInit() {
    // writing our own obserable
    this.firstObsSubscription = interval(1000).subscribe(count => {
      console.log(count);
    });

    // writing pure obserablle
    const customIntervalObserable = Observable.create( observer => {
      let count = 100;
      setInterval( () =>{
        observer.next(count);
        count += 100;
        // to throw an error
        //observer.error();

        // to tell that you are done
        //observer.complete();


      }, 1000);
    });

    this.customeSubscription = customIntervalObserable.subscribe(data => {
        console.log("custom count: " + data);
    });
  }

  ngOnDestroy(): void {
    // it is to prevent memory leaks.
    this.firstObsSubscription.unsubscribe();
    this.customeSubscription.unsubscribe();
  }

}
