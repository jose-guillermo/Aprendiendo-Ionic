import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RespuestaMDB, PeliculaDetalle, RespuestaCredits, RespuestaConsulta, Genre, Generos } from '../interfaces/movies.interfaces';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const URL = environment.url;
const apiKey = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private http: HttpClient = inject(HttpClient);
  private popularesPage: number = 0;
  public generos: Generos | null = null;

  private ejecutarQuery<T>( query: string ) {
    query = URL + query;
    query += `&api_key=${ apiKey }&language=es&include_image_language=es`

    return this.http.get( query );
  }

  public getPopulares() {
    this.popularesPage ++;
    const query = `/discover/movie?sort_by=popularity.desc&page=${ this.popularesPage }`;
    return this.ejecutarQuery(query);
  }

  public getFeature() {
    const hoy = new Date();
    const ultimoDia = new Date( hoy.getFullYear(), hoy.getMonth() + 1, 0).getDate();
    const mes = hoy.getMonth() + 1;
    let mesString;

    if ( mes < 10 ){
      mesString = "0" + mes;
    } else {
      mesString = mes;
    }

    const inicio = `${ hoy.getFullYear }-${ mesString }-01`;
    const fin = `${ hoy.getFullYear }-${ mesString }-${ ultimoDia }`;

    return this.ejecutarQuery<RespuestaMDB>(`/discover/movie?primary_release_date.gte=${ inicio }&primary_release_date.lte=${ fin }`);
  }

  getPeliculaDetalle(id: number){
    return this.ejecutarQuery<PeliculaDetalle>(`/movie/${ id }?a=1`);
  }

  getActoresPelicula(id: number){
    return this.ejecutarQuery<RespuestaCredits>(`/movie/${ id }/credits?a=1`);
  }

  consultaPelicula(termino: string){
    return this.ejecutarQuery<RespuestaConsulta>(`/search/movie?query=${ termino }`);
  }

  cargarGeneros(): Promise<Generos> {
    return new Promise( resolve => {
      this.ejecutarQuery<Generos>(`/genre/movie/list?a=1`)
      .subscribe( (resp: any) => {
        this.generos = resp;

        resolve(this.generos!);
      })
    })

  }
}
