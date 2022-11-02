import { Component,NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/AuthService (1)';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authservice:AuthService , private ngZone:NgZone , private router:Router) { }

  ngOnInit(): void {
  }

  GOOGLE(): void {
    this.authservice.doGoogleLogin().then(() => {this.successRedirect}).catch((error=> console.log(error)));
  }

  successRedirect(): void {
    this.ngZone.run( () => {
    this.router.navigate(['/members'])});
    
  }

}
