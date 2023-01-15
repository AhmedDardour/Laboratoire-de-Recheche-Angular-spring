import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';  //pour que le service doit etre injecté 
import { Member } from 'src/modals/Member';


@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private URL:string = "http://localhost:8082"
  constructor(private httpClient:HttpClient) { }

 saveMember(member:any): Promise<void> // le but de cette methode c'est l'envoie d'une requete http afin d'ajouter une ligne dans le tab 
  
 
 {
  let date = new Date().toISOString().split('T')[0];
    const MemberToSave = {...member,
    date: member.createdDate ?? date,
    type_mbr: member.type === 'STUDENT' ? 'etd' : 'ens'
  };
  if(member.type == 'STUDENT')
   return this.httpClient.post<void>(this.URL +'/membres/etudiant', MemberToSave).toPromise();
   else 
   return this.httpClient.post<void>(this.URL +'/membres/enseignant', MemberToSave).toPromise();
  }

  getMemberById(currentId:String):Promise<Member> 
  { 
    return this.httpClient.get<Member>( `${this.URL}/membres/${currentId}`).toPromise();
   
  }

  deleteMemberById(currentId:string):Promise<void>{
   return this.httpClient.delete<void>(`${this.URL}/membres/${currentId}`).toPromise();
  }

  getAllMembers():Promise<Member[]> {
    return this.httpClient.get<Member[]>(this.URL +'/membres').toPromise();
  }
}
