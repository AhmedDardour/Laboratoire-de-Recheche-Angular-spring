import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from 'src/modals/Member';
import { Tool } from 'src/modals/Tool';
import { ToolService } from 'src/services/tool.service';

@Component({
  selector: 'app-tool-form',
  templateUrl: './tool-form.component.html',
  styleUrls: ['./tool-form.component.scss']
})
export class ToolFormComponent implements OnInit {
  form!:FormGroup;
  currentID!:string;
  itemglobale!:Tool;
    constructor(private toolsService : ToolService, private router : Router , private activatedRoute: ActivatedRoute)  // on declare le service dans le constructeur de composent pour pouvoir l'utilisé 
    {
      
    }
  
    ngOnInit(): void {
       //creer l'obje avec ses 4 attributs
      //  1.recupere id de url
      this.currentID=this.activatedRoute.snapshot.params.id;
      console.log(this.currentID);
      // 2 si id a une valeur => declancher la fonction du serveur
      if(!!this.currentID){
        this.toolsService.getToolById(this.currentID).then((item)=>{
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
        source:  new FormControl(null, [Validators.required])
      });
    }
  
    initForm1(item : Tool): void {
      this.form=new FormGroup({
        source:  new FormControl(item.source, [Validators.required])
      });
      console.log(this.form.value)
    }
  
      ONSUB():void {
        console.log(this.form.value); //affichage de la form groups
         
         //appeler la fct du service (saveMember ) pour ajouter la ligne dans le tab 
         const objectToSubmit = {...this.itemglobale,...this.form.value};
         this.toolsService.savetool(objectToSubmit).then(() => {this.router.navigate(['./tools'])});   // (): reture   { }: action
      }
        
  
  
  }