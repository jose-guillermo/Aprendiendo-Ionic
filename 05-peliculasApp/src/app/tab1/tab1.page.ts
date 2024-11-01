import { Component, inject, OnInit, signal } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula, RespuestaMDB } from '../interfaces/movies.interfaces';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  public peliculasRecientes = signal<Pelicula[]>([]);
  public populares = signal<Pelicula[]>([]);

  private moviesService: MoviesService = inject(MoviesService);


  ngOnInit(): void {
    this.moviesService.getFeature()
      .subscribe( (resp: any) => {
        this.peliculasRecientes.set(resp.results);

      } )

    this.getPopulares();
  }

  cargarMas(){
    this.getPopulares();
  }

  getPopulares() {
    this.moviesService.getPopulares()
      .subscribe( (resp: any) => {
        this.populares.update( populares => {
          populares.push( ...resp.results );
          return populares;
        });

      })
  }
}
