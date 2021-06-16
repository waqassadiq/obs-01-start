import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  
  private activatedSub: Subscription;

  constructor(private userService: UserService) {}
  
  ngOnDestroy(): void {
    this.activatedSub.unsubscribe();
  }

  userActiviated: boolean;
  ngOnInit() {
    this.userService.activatedEmitter.subscribe(didActivate =>{
      this.userActiviated = didActivate;
    });

    this.activatedSub = this.userService.activatedSubjectEmitter.subscribe(didActivate =>{
      this.userActiviated = didActivate;
    });
  }
}
