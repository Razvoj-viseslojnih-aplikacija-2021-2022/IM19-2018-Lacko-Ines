import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs/internal/Observable';
import { Proizvodjac } from 'src/app/model/proizvodjac';
import { ProizvodjacService } from 'src/app/services/proizvodjac.service';
import { ProizvodjacDialogComponent } from '../dialog/proizvodjac-dialog/proizvodjac-dialog.component';

@Component({
  selector: 'app-proizvodjac',
  templateUrl: './proizvodjac.component.html',
  styleUrls: ['./proizvodjac.component.css']
})
export class ProizvodjacComponent implements OnInit {
  // constructor() { }
  displayedColumns = ['id', 'naziv', 'adresa', 'kontakt', 'actions'];

  dataSource!: Observable<Proizvodjac[]>;

  constructor(public proizvodjacService: ProizvodjacService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData(){
    this.dataSource = this.proizvodjacService.getAllProizvodjac();
  }

  public openDialog(flag: number, id: number, naziv: string, adresa: string, kontakt: string) {
    const dialog = this.dialog.open(ProizvodjacDialogComponent, {data: {id: id, naziv: naziv, adresa: adresa, kontakt: kontakt}});
    dialog.componentInstance.flag = flag;
    dialog.afterClosed().subscribe(result => {
      if (result === 1) {
        this.loadData();
      }
    })
  }

}
