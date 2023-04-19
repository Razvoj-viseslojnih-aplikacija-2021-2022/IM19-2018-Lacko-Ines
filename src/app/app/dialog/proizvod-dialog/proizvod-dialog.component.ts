import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Proizvod } from 'src/app/model/proizvod';
import { Proizvodjac } from 'src/app/model/proizvodjac';
import { ProizvodService } from 'src/app/services/proizvod.service';
import { ProizvodjacService } from 'src/app/services/proizvodjac.service';

@Component({
  selector: 'app-proizvod-dialog',
  templateUrl: './proizvod-dialog.component.html',
  styleUrls: ['./proizvod-dialog.component.css']
})
export class ProizvodDialogComponent implements OnInit{

  public flag!: number;

  proizvodjaci!: Proizvodjac[];

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ProizvodDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: Proizvod,
    public proizvodService: ProizvodService,
    public proizvodjacService: ProizvodjacService ) { }

    ngOnInit(): void {
      this.proizvodjacService.getAllProizvodjac().subscribe(proizvodjaci =>
      this.proizvodjaci = proizvodjaci)
  }

  public add(): void {
    this.proizvodService.addProizvod(this.data);
    this.snackBar.open('Uspešno dodat proizvod ' + this.data.id, 'Uredu', {duration: 2000});
  }

  public update(): void {
    this.proizvodService.updateProizvod(this.data);
    this.snackBar.open('Uspešno izmenjen proizvod ' + this.data.id, 'Uredu', {duration: 2000});
  }

  public delete(): void {
    this.proizvodService.deleteProizvod(this.data.id);
    this.snackBar.open('Uspešno obrisan proizvod ' + this.data.id, 'Uredu', {duration: 2000});
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste', 'Uredu', {duration: 2000});
  }

  compareTo(a: any, b: any) {
    return a.id === b.id;
  }
}
