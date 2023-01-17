import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Evenement } from 'src/modals/Event';
import { Member } from 'src/modals/Member';
import { EventService } from 'src/services/event.service';
import { MemberService } from 'src/services/member.service';
import { GLOBAL } from '../app-config';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-event',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  //dataSource:Member[]=;// declaration 
  dataSource:MatTableDataSource<Evenement>;

  constructor(private eventService : EventService , private dialog : MatDialog) // initialisation 
  { 
    this.dataSource= new MatTableDataSource()
  }

  ngOnInit(): void { // initialize les attributes s'executes on initialization avant constructor

    this.fetchDataSource();

  }

  displayedColumns: any[] = ['id','titre','lieu','date','actions'];

  fetchDataSource():void{
    this.eventService.getAllEvent().then((tableau)=>{this.dataSource.data=tableau});
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
        this.eventService.deleteEventById(id).then(() => {this.fetchDataSource()})  ////mise a jour du tableau lorque on suprime
      }
    })

    //3.testter sur le retour

    //4.if (click sur confirm)
    
  }

}
