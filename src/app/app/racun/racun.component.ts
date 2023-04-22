import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
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

  // dataSource!: Observable<Racun[]>;
  dataSource!: MatTableDataSource<Racun>;
 
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private racunService : RacunService,
              private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadData();
  }  

  public loadData(){
   // this.dataSource = this.racunService.getAllRacun();
   this.racunService.getAllRacun().subscribe( data => {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.sortingDataAccessor = (data:any, property) =>{
      switch(property){
        case 'id': return data[property];
        default: return data[property].toLocaleLowerCase();
      }
    };
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  });
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

  applyFilter(filterValue: string) {
    filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
