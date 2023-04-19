import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs/internal/Observable';
import  { Racun } from 'src/app/model/racun';
import { RacunService } from 'src/app/services/racun.service';
import { RacunDialogComponent } from '../dialog/racun-dialog/racun-dialog.component';

@Component({
  selector: 'app-racun',
  templateUrl: './racun.component.html',
  styleUrls: ['./racun.component.css']
})
export class RacunComponent implements OnInit {

  displayedColumns = ['id','datum','nacinplacanja','actions'];

  today: Date = new Date();

  dataSource!: Observable<Racun[]>;
 // constructor() { }

  constructor(private racunService : RacunService,
              private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadData();
  }  

  public loadData(){
   this.dataSource = this.racunService.getAllRacun();
   /*this.racunService.getAllRacun().subscribe(data => {
    this.dataSource = new MatTableDataSource(data);
  } 
  )/*,
  (error : Error) => {
    console.log(error.name + ' ' + error.message);
  }*/
  }

  public openDialog(flag: number, id: number, datum: Date, nacinplacanja: string) {
    const dialog = this.dialog.open(RacunDialogComponent, {data: {id: id, datum: datum, nacinplacanja: nacinplacanja}});
    dialog.componentInstance.flag = flag;
    dialog.afterClosed().subscribe(result => {
      if (result === 1) {
        this.loadData();
      }
    })

  }
}
