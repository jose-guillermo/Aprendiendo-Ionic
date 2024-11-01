import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { Componente } from "../interfaces/interfaces"
import { Album } from '../interfaces/album.interface';
import { Hero } from '../interfaces/hero.interface';
import { delay } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private http: HttpClient = inject(HttpClient)

  getUsuario() {
    return this.http.get<User[]>("https://jsonplaceholder.typicode.com/users");
  }

  getMenuOpts() {
    return this.http.get<Componente[]>('/assets/data/menu-opts.json');
  }

  getAlbums() {
    return this.http.get<Album[]>('https://jsonplaceholder.typicode.com/albums');
  }

  getHeroes() {
    return this.http.get<Hero[]>('/assets/data/superheroes.json')
              .pipe(
                delay( 1500 )
              );

  }

}
