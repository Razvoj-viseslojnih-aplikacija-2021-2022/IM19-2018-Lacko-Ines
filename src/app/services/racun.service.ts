import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Racun } from '../model/racun';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable(
  {
  providedIn: 'root'
})
export class RacunService {

  private readonly API_URL = 'http://localhost:8082/racun';

  dataChange: BehaviorSubject<Racun[]> = new BehaviorSubject<Racun[]>([]);

  constructor(private httpClient: HttpClient) {

   }
   public getAllRacun(): Observable<Racun[]>{
    this.httpClient.get<Racun[]>(this.API_URL).subscribe(
      data => {
      this.dataChange.next(data);
    },
    (error: HttpErrorResponse) => {
      console.log(error.name + ' ' + error.message);
    });

    return this.dataChange.asObservable();
  }
   }


