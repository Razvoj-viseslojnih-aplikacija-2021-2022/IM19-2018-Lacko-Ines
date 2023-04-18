import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import  { Racun } from 'src/app/model/racun';
import { RacunService } from 'src/app/services/racun.service';

@Component({
  selector: 'app-racun',
  templateUrl: './racun.component.html',
  styleUrls: ['./racun.component.css']
})
export class RacunComponent implements OnInit {

  displayedColumns = ['id','datum','nacinplacanja','actions'];
  dataSource!: MatTableDataSource<Racun>;
 // constructor() { }

  constructor(private racunService : RacunService) {}

  ngOnInit(): void {
    this.loadData();
  }  

  public loadData(){
   // this.dataSource = this.racunService.getAllRacun();
   this.racunService.getAllRacun().subscribe(data => {
    this.dataSource = new MatTableDataSource(data);
  } 
  ),
  (error : Error) => {
    console.log(error.name + ' ' + error.message);
  }
  }
}
