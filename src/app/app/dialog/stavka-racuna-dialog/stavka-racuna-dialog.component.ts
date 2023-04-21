import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Proizvod } from 'src/app/model/proizvod';
import { Racun } from 'src/app/model/racun';
import { StavkaRacuna } from 'src/app/model/stavka-racuna';
import { ProizvodService } from 'src/app/services/proizvod.service';
import { RacunService } from 'src/app/services/racun.service';
import { StavkaRacunaService } from 'src/app/services/stavka-racuna.service';

@Component({
  selector: 'app-stavka-racuna-dialog',
  templateUrl: './stavka-racuna-dialog.component.html',
  styleUrls: ['./stavka-racuna-dialog.component.css']
})
export class StavkaRacunaDialogComponent implements OnInit{

  public flag!: number;
  racuni!: Racun[];
  proizvodi!: Proizvod[];

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<StavkaRacunaDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: StavkaRacuna,
    public stavkaRacunaService: StavkaRacunaService,
    public proizvodService: ProizvodService,
    public racunService: RacunService ) { }

  ngOnInit(): void {
    this.racunService.getAllRacun().subscribe(racuni =>
      this.racuni = racuni);
      this.proizvodService.getAllProizvod().subscribe(proizvodi =>
      this.proizvodi = proizvodi);
  }

  public add(): void {
    this.stavkaRacunaService.addStavkaRacuna(this.data);
    this.snackBar.open('Uspešno dodata stavka računa ' + this.data.id, 'Uredu', {duration: 2000});
  }

  public update(): void {
    this.stavkaRacunaService.updateStavkaRacuna(this.data);
    this.snackBar.open('Uspešno izmenjena stavka računa ' + this.data.id, 'Uredu', {duration: 2000});
  }

  public delete(): void {
    this.stavkaRacunaService.deleteStavkaRacuna(this.data.id);
    this.snackBar.open('Uspešno obrisana stavka računa ' + this.data.id, 'Uredu', {duration: 2000});
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste', 'Uredu', {duration: 2000});
  }

  compareTo(a: any, b: any) {
    return a.id === b.id;
  }

}
