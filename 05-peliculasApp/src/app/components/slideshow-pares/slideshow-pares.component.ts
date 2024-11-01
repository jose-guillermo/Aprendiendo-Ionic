import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Pelicula } from 'src/app/interfaces/movies.interfaces';
import { register } from 'swiper/element/bundle';
import { DetalleComponent } from '../detalle/detalle.component';

register();


@Component({
  selector: 'app-slideshow-pares',
  templateUrl: './slideshow-pares.component.html',
  styleUrls: ['./slideshow-pares.component.scss'],
})
export class SlideshowParesComponent {

  @Input({required: true}) peliculas!: Pelicula[];
  @Output() cargarMas = new EventEmitter();
  // @ViewChild('swiper') swiperRef: ElementRef | undefined;
  private modalCtrl: ModalController = inject(ModalController);

  private cargarPrimeraVez = false;

  async verDetalle( id: number ){
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        id
      }
    });

    modal.present();
  }

  cargarSlides(){
    if(!this.cargarPrimeraVez){
      this.cargarPrimeraVez = true;
      return;
    }
    setTimeout(() => this.cargarMas.emit(), 500);

  }
}


