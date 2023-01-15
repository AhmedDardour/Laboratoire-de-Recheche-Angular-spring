import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/services/AuthService (1)';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'FirstApp';
  loggedIn = new BehaviorSubject<boolean>(false);
  loggedIn$ = this.loggedIn.asObservable();
  

  constructor(private authservice:AuthService , private router:Router,
    public afAuth: AngularFireAuth) {
     }
  ngOnInit(): void {

    
    this.authservice.getUserClaims()
    .then(() => this.loggedIn.next(true))
    .catch(() => this.loggedIn.next(false))
 
  }
}