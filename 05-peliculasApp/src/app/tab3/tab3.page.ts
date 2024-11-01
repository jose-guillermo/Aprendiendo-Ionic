import { AfterViewInit, Component, inject, OnChanges, OnInit, signal, SimpleChanges } from '@angular/core';
import { Generos, Genre, PeliculaDetalle } from '../interfaces/movies.interfaces';
import { DataLocalService } from '../services/data-local.service';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../components/detalle/detalle.component';
import { MoviesService } from '../services/movies.service';

interface GenerosPeliculas{
  genero: string;
  peliculas: PeliculaDetalle[];
}

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page{

  public generos = signal<Generos | null>(null);

  public generosFavoritos = signal<GenerosPeliculas[]>([]);

  private dataLocalService: DataLocalService = inject(DataLocalService);
  private modalCtrl: ModalController = inject(ModalController);
  private moviesService: MoviesService = inject(MoviesService);

  async ionViewWillEnter() {
    this.moviesService.cargarGeneros();
    this.generos.set(await this.moviesService.cargarGeneros());
    this.pelisPorGenero(this.generos()!.genres, this.getPeliculas)
  }


  async verDetalle( id: number ){
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        id
      }
    });

    modal.onDidDismiss().then((result) => {
      this.pelisPorGenero(this.generos()!.genres, this.getPeliculas)
    })

    modal.present();
  }

  pelisPorGenero ( generos: Genre[], peliculas: PeliculaDetalle[]){
    this.generosFavoritos.set([]);
    console.log("peliculas",peliculas);


    generos.forEach( genero => {
      this.generosFavoritos.update( generoFavorito => {
        generoFavorito.push({
          genero: genero.name,
          peliculas: peliculas.filter( pelicula => {
            return pelicula.genres.find(genre => genre.id === genero.id)
          })
        });
        return generoFavorito;
      })
    })

    console.log("generosFavoritos: ",this.generosFavoritos());

  }

  get getPeliculas(): PeliculaDetalle[] {
    return this.dataLocalService.getLocalPeliculas;
  }
}
