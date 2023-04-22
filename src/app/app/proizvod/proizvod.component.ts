import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs/internal/Observable';
import { Proizvod } from 'src/app/model/proizvod';
import { Proizvodjac } from 'src/app/model/proizvodjac';
import { ProizvodService } from 'src/app/services/proizvod.service';
import { ProizvodDialogComponent } from '../dialog/proizvod-dialog/proizvod-dialog.component';

@Component({
  selector: 'app-proizvod',
  templateUrl: './proizvod.component.html',
  styleUrls: ['./proizvod.component.css']
})
export class ProizvodComponent implements OnInit {
  displayedColumns = ['id', 'naziv', 'proizvodjac', 'actions'];

  proizvodjac!: Proizvodjac;

 // dataSource!: Observable<Proizvod[]>;
 dataSource!: MatTableDataSource<Proizvod>;

  selektovaniProizvod!: Proizvod;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;
  
constructor(public proizvodService: ProizvodService,
  public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadData();
  }

  public loadData(){
   // this.dataSource = this.proizvodService.getAllProizvod();
    this.proizvodService.getAllProizvod().subscribe( data => {
      this.dataSource = new MatTableDataSource(data);

      this.dataSource.filterPredicate = (data: any, filter: string) => {
        const accumulator = (currentTerm: string, key: string) => {
          return key === 'proizvodjac' ? currentTerm + data.proizvodjac.naziv : currentTerm + data[key];
        };
        const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) !== -1;
      };

      this.dataSource.sortingDataAccessor = (data:any, property) =>{
        switch(property){
          case 'id': return data[property];
          case 'naziv': return data[property];
          case 'proizvodjac': return data.proizvodjac.naziv;
          default: return data[property].toLocaleLowerCase();
        }
      };
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  public openDialog(flag: number, id: number, naziv: string, proizvodjac: Proizvodjac) {
    const dialog = this.dialog.open(ProizvodDialogComponent, {data: {id: id, naziv: naziv, proizvodjac: proizvodjac}});
    dialog.componentInstance.flag = flag;
    dialog.afterClosed().subscribe(result => {
      if (result === 1) {
        this.loadData();
      }
    })
  }

  public selectedRow(row: Proizvod): void {
    this.selektovaniProizvod = row;

  }
  applyFilter(filterValue: string) {
    filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
