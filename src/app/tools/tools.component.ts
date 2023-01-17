import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Tool } from 'src/modals/Tool';
import { ToolService } from 'src/services/tool.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss']
})
export class ToolsComponent implements OnInit {
//dataSource:Member[]=;// declaration 
dataSource:MatTableDataSource<Tool>;

constructor(private toolsService : ToolService , private dialog : MatDialog) // initialisation 
{ 
  this.dataSource= new MatTableDataSource()
}

ngOnInit(): void { // initialize les attributes s'executes on initialization avant constructor

  this.fetchDataSource();

}

displayedColumns: any[] = ['id','source','date', 'actions'];

fetchDataSource():void{
  this.toolsService.getAllTool().then((tableau)=>{this.dataSource.data=tableau});
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
      this.toolsService.deleteToolById(id).then(() => {this.fetchDataSource()})  ////mise a jour du tableau lorque on suprime
    }
  })

  //3.testter sur le retour

  //4.if (click sur confirm)
  
}

}