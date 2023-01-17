import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Evenement } from 'src/modals/Event';
import { Tool } from 'src/modals/Tool';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private URL:string = "http://localhost:8085"
  constructor(private httpClient:HttpClient) { }

 savetool(event:any): Promise<void> // le but de cette methode c'est l'envoie d'une requete http afin d'ajouter une ligne dans le tab 
{ 
 

 
 
  
 
   return this.httpClient.post<void>(this.URL +'/events/evenement', event).toPromise();
  
 }
  getEvnentById(currentId:String):Promise<Evenement> 
  { 
    return this.httpClient.get<Evenement>( `${this.URL}//event/${currentId}`).toPromise();
   
  }

  deleteEventById(currentId:string):Promise<void>{
   return this.httpClient.delete<void>(`${this.URL}/events/${currentId}`).toPromise();
  }

  getAllEvent():Promise<Evenement[]> {
    return this.httpClient.get<Evenement[]>(this.URL +'/events').toPromise();
  }
}
