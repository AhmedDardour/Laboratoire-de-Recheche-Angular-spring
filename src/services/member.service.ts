import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';  //pour que le service doit etre injecté 
import { GLOBAL } from 'src/app/app-config';
import { Member } from 'src/modals/Member';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  public tab:Member[]=GLOBAL._DB.members;
  constructor(private httpClient:HttpClient) { }

 saveMember(member:any): Promise<void> // le but de cette methode c'est l'envoie d'une requete http afin d'ajouter une ligne dans le tab 
  {
    const MemberToSave = {...member,
    id: member.id?? Math.ceil(Math.random()*10000).toString(),
    createDate: member.createdDate ?? new Date().toISOString(),
  };

  this.tab=[MemberToSave,...this.tab.filter(item=>item.id!=MemberToSave.id)]

  return new Promise(resolve=>resolve()) // comme try si on est en resolve return resolve()
    // this.httpClient.post<Member>('linktorestApi', member).toPromise();
    //on va creé un tab dans le service(copie de la bd )
    //ajouter l'element member dans le tab de service 
  }

  getMemberById(currentId:String):Promise<Member> 
  { 
    //return this.httpClient.get<Member>('link').toPromise();
    return new Promise(resolve=>resolve(
    this.tab.filter(item=>item.id===currentId)[0]??null))
  }

  deleteMemberById(id:string):Promise<void>{
   // return this.httpClient.delete<void>('link').toPromise();
   this.tab=this.tab.filter(item=>item.id!=id);
   return new Promise(resolve=>resolve());
  }

  getAllMembers():Promise<Member[]> {
    return new Promise(resolve=>resolve(this.tab));
  }
}
