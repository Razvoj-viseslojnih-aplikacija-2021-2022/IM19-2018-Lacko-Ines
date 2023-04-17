import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './app/core/about/about.component';
import { AuthorComponent } from './app/core/author/author.component';
import { HomeComponent } from './app/core/home/home.component';
import { ProizvodComponent } from './app/proizvod/proizvod.component';
import { ProizvodjacComponent } from './app/proizvodjac/proizvodjac.component';
import { RacunComponent } from './app/racun/racun.component';
import { StavkaRacunaComponent } from './app/stavka-racuna/stavka-racuna.component';

const routes: Routes = [
  {path: 'racun', component: RacunComponent},
  {path: 'proizvodjac', component: ProizvodjacComponent},
  {path: 'proizvod', component: ProizvodComponent},
  {path: 'stavkaRacuna', component: StavkaRacunaComponent},
  {path: 'home', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'author', component: AuthorComponent},
  { path:'', redirectTo : '/home', pathMatch : 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
