import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tool } from 'src/modals/Tool';

@Injectable({
  providedIn: 'root'
})
export class ToolService {
  private URL:string = "http://localhost:8084"
  constructor(private httpClient:HttpClient) { }

 savetool(tool:any): Promise<void> // le but de cette methode c'est l'envoie d'une requete http afin d'ajouter une ligne dans le tab 
{ let date = new Date().toISOString().split('T')[0];
 const toolToSave = {...tool,
 date: tool.createdDate ?? date
};
 
 
  
 
   return this.httpClient.post<void>(this.URL +'/outils', toolToSave).toPromise();
  
 }
  getToolById(currentId:String):Promise<Tool> 
  { 
    return this.httpClient.get<Tool>( `${this.URL}/outil/${currentId}`).toPromise();
   
  }

  deleteToolById(currentId:string):Promise<void>{
   return this.httpClient.delete<void>(`${this.URL}/outils/${currentId}`).toPromise();
  }

  getAllTool():Promise<Tool[]> {
    return this.httpClient.get<Tool[]>(this.URL +'/outils').toPromise();
  }
}
