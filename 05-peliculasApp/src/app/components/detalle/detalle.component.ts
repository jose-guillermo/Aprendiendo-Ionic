import { Component, computed, inject, Input, OnInit, signal } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Cast, PeliculaDetalle } from 'src/app/interfaces/movies.interfaces';
import { DataLocalService } from 'src/app/services/data-local.service';
import { MoviesService } from 'src/app/services/movies.service';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent  implements OnInit {

  @Input({required: true}) id!: number;

  public pelicula = signal<PeliculaDetalle | null>(null);
  public actores = signal<Cast[]>([]);
  public oculto = signal(150);
  public isFavorite = signal(false);
  public corazon = computed(() => this.isFavorite() ? "heart" : "heart-outline");

  private modalCtrl: ModalController = inject(ModalController);
  private moviesService: MoviesService = inject(MoviesService);
  private dataLocal: DataLocalService = inject(DataLocalService);

  ngOnInit() {
    this.comprobarFavorita();
    this.moviesService.getPeliculaDetalle( this.id )
      .subscribe( (resp: any) => {
        this.pelicula.set(resp);
      });

    this.moviesService.getActoresPelicula( this.id )
      .subscribe((resp: any) => {
        this.actores.set(resp.cast);
      });
  }

  async comprobarFavorita(){
    const favorito = await this.dataLocal.existePelicula(this.id)
    this.isFavorite.set(favorito);
  }

  async favorito(){
    await this.dataLocal.guardarPelicula(this.pelicula()!);
    await this.comprobarFavorita();
  }

  regresar(){
    this.modalCtrl.dismiss();
  }

}
