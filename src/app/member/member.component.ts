import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Member } from 'src/modals/Member';
import { MemberService } from 'src/services/member.service';
import { GLOBAL } from '../app-config';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {

  //dataSource:Member[]=;// declaration 
  dataSource:MatTableDataSource<Member>;

  constructor(private MemberService : MemberService , private dialog : MatDialog) // initialisation 
  { 
    this.dataSource= new MatTableDataSource()
  }

  ngOnInit(): void { // initialize les attributes s'executes on initialization avant constructor

    this.fetchDataSource();

  }

  displayedColumns: any[] = ['id','cin','name','email','createdDate','cv','type','actions'];

  fetchDataSource():void{
    this.MemberService.getAllMembers().then((tableau)=>{this.dataSource.data=tableau});
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  Delete(id:string):void{
    // 1.ouvrir la boite de dialouge
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {});

    //2.attendre le resultat
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.MemberService.deleteMemberById(id).then(() => {this.fetchDataSource()})  ////mise a jour du tableau lorque on suprime
      }
    })

    //3.testter sur le retour

    //4.if (click sur confirm)
    
  }

}
