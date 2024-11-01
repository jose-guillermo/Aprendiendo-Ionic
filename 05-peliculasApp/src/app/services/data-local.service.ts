import { inject, Injectable, OnInit, signal } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { PeliculaDetalle } from '../interfaces/movies.interfaces';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService{

  public peliculas = signal<PeliculaDetalle[]>([])
  private _storage: Storage | null = null;

  private storage: Storage = inject(Storage);
  private toastCtrl: ToastController = inject(ToastController);

  constructor(){
    this.init();
  }

  get getLocalPeliculas() {
    return [ ...this.peliculas() ]
  }

  async init() {
    this._storage = await this.storage.create();
    this.cargarFavoritos();
  }

  async presentToast( message: string ) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 1500,
    });

    await toast.present();
  }

  async cargarFavoritos(){
    const peliculas = await this._storage?.get("peliculas");

    this.peliculas.set( peliculas || [] );
  }

  async existePelicula( id: number ){
    const existe = this.peliculas().find( peli => peli.id === id);

    return (existe) ? true : false;
  }

  async guardarPelicula( pelicula: PeliculaDetalle ){
    let existe = false;
    let mensaje = "";
    for (const peli of this.peliculas()) {
      if (peli.id === pelicula.id){
        existe = true;
        break;
      }
    }

    if (existe) {
      this.peliculas.set(this.peliculas().filter(peli => peli.id !== pelicula.id));
      mensaje = "Removido de favoritos";
    } else {
      this.peliculas.update( favoritos => [ ...favoritos, pelicula])
      mensaje = "Agregada a favoritos";
    }


    if (this._storage){

      await this._storage!.set("peliculas", this.peliculas());
      this.presentToast(mensaje);
    }

  };
}
