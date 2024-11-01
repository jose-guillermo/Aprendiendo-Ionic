import { Component, inject, signal } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula } from '../interfaces/movies.interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../components/detalle/detalle.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public textoBuscar = signal("");
  public sugerencias = signal<string[]>(["Spiderman", "Avengers", "El señor de los anillos", "La vida es bella"]);
  public peliculas = signal<Pelicula[]>([])
  public buscando = signal(false);

  private moviesService: MoviesService = inject(MoviesService);
  private modalCtrl: ModalController = inject(ModalController);


  async verDetalle( id: number ){
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        id
      }
    });

    modal.present();
  }

  buscar( event: any ){
    this.buscando.set(true);
    const valor = event.detail.value;
    this.moviesService.consultaPelicula(valor)
      .subscribe( (resp: any) => {
        this.peliculas.set(resp.results);
        this.buscando.set(false);

      });
  }

  clickSugerencia( sugerencia: string) {
    this.textoBuscar.set(sugerencia);
  }

}


