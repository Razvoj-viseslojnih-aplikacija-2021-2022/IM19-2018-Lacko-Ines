import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
// import { Observable } from 'rxjs/internal/Observable';
import { Proizvod } from 'src/app/model/proizvod';
import { Racun } from 'src/app/model/racun';
import { StavkaRacuna } from 'src/app/model/stavka-racuna';
import { StavkaRacunaService } from 'src/app/services/stavka-racuna.service';
import { StavkaRacunaDialogComponent } from '../dialog/stavka-racuna-dialog/stavka-racuna-dialog.component';

@Component({
  selector: 'app-stavka-racuna',
  templateUrl: './stavka-racuna.component.html',
  styleUrls: ['./stavka-racuna.component.css']
})
export class StavkaRacunaComponent implements OnInit  {

  

  displayedColumns = ['id', 'redniBroj', 'kolicina', 'jedinicaMere', 'cena', 'racun', 'proizvod', 'actions'];

  // dataSource!: Observable<StavkaRacuna[]>;
   dataSource!: MatTableDataSource<StavkaRacuna>;

   subcription!: Subscription;

   @Input() selektovaniProizvod!: Proizvod;

  proizvod!: Proizvod;

  racun!: Racun;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(public stavkaRacunaService: StavkaRacunaService,
    public dialog: MatDialog) {}

  ngOnInit(): void {
   // this.loadData();
  }
    ngOnChanges(): void {
      if (this.selektovaniProizvod!.id) {
        this.loadData();
      } }

      public loadData(){
        //this.dataSource = this.stavkaPorudzbineService.getAllStavkeZaPorudzbinu(this.selektovanaPorudzbina.id);
        this.stavkaRacunaService.getAllStavkeZaRacune(this.selektovaniProizvod.id).subscribe( data => {
          this.dataSource = new MatTableDataSource(data);
          
      this.dataSource.filterPredicate = (data: any, filter: string) => {
        const accumulator = (currentTerm: string, key: string) => {
          return key === 'racun' ? currentTerm + data.racun.nacinplacanja : currentTerm + data[key];
        };
        const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) !== -1;
      };

      this.dataSource.sortingDataAccessor = (data:any, property) =>{
        switch(property){
          case 'id': return data[property];
          case 'redniBroj': return data[property];
          case 'kolicina': return data[property];
          case 'cena': return data[property];
          case 'racun': return data.racun.nacinplacanja.toLocaleLowerCase();
          default: return data[property].toLocaleLowerCase();
        }
      };
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
        
      } 
  

      public openDialog(flag: number, id: number, redniBroj: number, kolicina: number, jedinicaMere: string, cena: number, racun: Racun, proizvod: Proizvod) {
    const dialog = this.dialog.open(StavkaRacunaDialogComponent, {data: {id: id, redniBroj: redniBroj, kolicina: kolicina, jedinicaMere: jedinicaMere, cena: cena, racun: racun, proizvod: proizvod,}});
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
