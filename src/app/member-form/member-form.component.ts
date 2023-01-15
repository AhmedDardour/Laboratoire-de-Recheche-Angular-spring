import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from 'src/modals/Member';
import { MemberService } from 'src/services/member.service';

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.scss']
})
export class MemberFormComponent implements OnInit {
form!:FormGroup;
currentID!:string;
itemglobale!:Member;
  constructor(private MemberService : MemberService, private router : Router , private activatedRoute: ActivatedRoute)  // on declare le service dans le constructeur de composent pour pouvoir l'utilisé 
  {
    
  }

  ngOnInit(): void {
     //creer l'obje avec ses 4 attributs
    //  1.recupere id de url
    this.currentID=this.activatedRoute.snapshot.params.id;
    console.log(this.currentID);
    // 2 si id a une valeur => declancher la fonction du serveur
    if(!!this.currentID){
      this.MemberService.getMemberById(this.currentID).then((item)=>{
        this.itemglobale=item;
        console.log(this.itemglobale);
        this.initForm1(this.itemglobale);
      
      })
    }
    // getMemberByid(id)=> member
   else this.initForm(); 
  
    // 3. sinon appeler initForm 
  }

  initForm(): void {
    this.form=new FormGroup({
      cin:  new FormControl(null, [Validators.required]),  //Validators.required c'est un champs requie 
      nom:  new FormControl(null, [Validators.required]),
      prenom:  new FormControl(null, [Validators.required]),
      email:  new FormControl(null, [Validators.required]),
      cv:  new FormControl(null, [Validators.required]),
      type:  new FormControl(null, [Validators.required])
    
    });
  }

  initForm1(item : Member): void {
    this.form=new FormGroup({
      cin:  new FormControl(item.cin, [Validators.required]),   //Validators.required c'est un champs requie 
      nom:  new FormControl(item.nom, [Validators.required]),
      prenom:  new FormControl(item.prenom, [Validators.required]),
      email:  new FormControl(item.email, [Validators.required]),
      cv:  new FormControl(item.cv, [Validators.required]),
      type:  new FormControl(item.type, [Validators.required])
    
    });
    console.log(this.form.value)
  }

    ONSUB():void {
      console.log(this.form.value); //affichage de la form groups
       
       //appeler la fct du service (saveMember ) pour ajouter la ligne dans le tab 
       const objectToSubmit = {...this.itemglobale,...this.form.value};
       this.MemberService.saveMember(objectToSubmit).then(() => {this.router.navigate(['./members'])});   // (): reture   { }: action
    }
      


}
