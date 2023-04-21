import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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

  constructor(public stavkaRacunaService: StavkaRacunaService,
    public dialog: MatDialog) {}

  ngOnInit(): void {
   // this.loadData();
  }

  /*public loadData(){
    this.dataSource = this.stavkaRacunaService.getAllStavkaRacuna();
  }*/
    ngOnChanges(): void {
      if (this.selektovaniProizvod!.id) {
        this.loadData();
      } }

      public loadData(){
        //this.dataSource = this.stavkaPorudzbineService.getAllStavkeZaPorudzbinu(this.selektovanaPorudzbina.id);
        this.stavkaRacunaService.getAllStavkeZaRacune(this.selektovaniProizvod.id).subscribe( data => {
          this.dataSource = new MatTableDataSource(data);
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

}
