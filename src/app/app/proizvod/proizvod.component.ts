import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
  displayedColumns = ['id', 'naziv', 'actions'];

  proizvodjac!: Proizvodjac;

  dataSource!: Observable<Proizvod[]>;
  
constructor(public proizvodService: ProizvodService,
  public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadData();
  }

  public loadData(){
    this.dataSource = this.proizvodService.getAllProizvod();
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
}
