import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { StavkaRacuna } from '../model/stavka-racuna';

@Injectable({
  providedIn: 'root'
})

export class StavkaRacunaService {
  private readonly API_URL = 'http://localhost:8082/stavka_racuna';

  private readonly API_URL_P = 'http://localhost:8082/stavkeZaRacune/';

  dataChange: BehaviorSubject<StavkaRacuna[]> = new BehaviorSubject<StavkaRacuna[]>([]);

  constructor(private httpClient: HttpClient) { }

  public getAllStavkaRacuna(): Observable<StavkaRacuna[]> {
    this.httpClient.get<StavkaRacuna[]>(this.API_URL).subscribe(
      (data) => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }
    );
    return this.dataChange.asObservable();
  }

  public getAllStavkeZaRacune(idProizvod: number): Observable<StavkaRacuna[]> {
    this.httpClient.get<StavkaRacuna[]>(this.API_URL_P + idProizvod).subscribe(
      (data) => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }
    );
    return this.dataChange.asObservable();
  }

  public addStavkaRacuna(stavkaRacuna: StavkaRacuna): void {
    this.httpClient.post(this.API_URL, stavkaRacuna).subscribe();
  }
  public updateStavkaRacuna(stavkaRacuna: StavkaRacuna): void {
    this.httpClient.put(this.API_URL + stavkaRacuna.id, stavkaRacuna).subscribe();
  }
  public deleteStavkaRacuna(id: number): void {
    this.httpClient.delete(this.API_URL + id).subscribe();
  }

}
