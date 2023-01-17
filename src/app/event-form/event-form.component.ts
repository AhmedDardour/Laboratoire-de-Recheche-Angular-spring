import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Evenement } from 'src/modals/Event'

import { EventService } from 'src/services/event.service';


@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit {
  form!:FormGroup;
  currentID!:string;
  itemglobale!:Evenement;
    constructor(private eventsService : EventService, private router : Router , private activatedRoute: ActivatedRoute)  // on declare le service dans le constructeur de composent pour pouvoir l'utilisé 
    {
      
    }
  
    ngOnInit(): void {
       //creer l'obje avec ses 4 attributs
      //  1.recupere id de url
      this.currentID=this.activatedRoute.snapshot.params.id;
      console.log(this.currentID);
      // 2 si id a une valeur => declancher la fonction du serveur
      if(!!this.currentID){
        this.eventsService.getEvnentById(this.currentID).then((item)=>{
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
        titre:  new FormControl(null, [Validators.required]),
        lieu:  new FormControl(null, [Validators.required]),
        date:  new FormControl(null, [Validators.required])
        
      });
    }
  
    initForm1(item : Evenement): void {
      this.form=new FormGroup({
        titre:  new FormControl(item.titre, [Validators.required]),
        lieu:  new FormControl(item.lieu, [Validators.required]),
        date:  new FormControl(item.date, [Validators.required])
      });
      console.log(this.form.value)
    }
  
      ONSUB():void {
        console.log(this.form.value); //affichage de la form groups
         
         //appeler la fct du service (saveMember ) pour ajouter la ligne dans le tab 
         const objectToSubmit = {...this.itemglobale,...this.form.value};
         this.eventsService.savetool(objectToSubmit).then(() => {this.router.navigate(['./events'])});   // (): reture   { }: action
      }
        
  
  
  }