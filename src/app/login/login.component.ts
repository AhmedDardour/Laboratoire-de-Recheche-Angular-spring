import { Component,NgZone, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/services/AuthService (1)';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  
  loggedIn = new BehaviorSubject<boolean>(false);
loggedIn$ = this.loggedIn.asObservable();

  constructor(private authservice:AuthService , private ngZone:NgZone , private router:Router,
    public afAuth: AngularFireAuth) {
     }
  ngOnInit(): void {

    
    this.authservice.getUserClaims()
    .then(user => this.router.navigate(['dashboard']))
    .catch(error => this.router.navigate(['login']) )

    
 
  }


  GOOGLE(): void {
    this.authservice.doGoogleLogin().then(() => {this.successRedirect()})
    .catch((error=> console.log(error)));
  }

  successRedirect(): void {
    this.ngZone.run( () => {
    this.router.navigate(['/dashboard']);});
    
  }

  



}
