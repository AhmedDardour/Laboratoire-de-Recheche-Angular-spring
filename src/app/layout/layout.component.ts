import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Member } from 'src/modals/Member';
import { AuthService } from 'src/services/AuthService (1)';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
user!  :  Member;
  constructor(private authService:AuthService , private router:Router) {  }

  ngOnInit(): void {
     this.authService.getUserClaims().then(user=>
      this.user = this.map(user));

  
  }

  map(user:any) : Member {
       return  {
            cin: '',
            nom: user['displayName'],
            id: '',
           
            prenom:'',
            email:user['email'],
            
            createdDate:'',
            cv:'',
            type:''
        };
  }

  logout():void{
    this.authService.doLogout().finally(()=>{this.router.navigate(['/login'])}
    )
  }
  

}
