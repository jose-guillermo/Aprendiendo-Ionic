import { Component, inject, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalInfoPage } from '../modal-info/modal-info.page';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  private modalCtrl: ModalController = inject(ModalController);


  ngOnInit() {
  }

  async mostrarModal(){
    const modal = await this.modalCtrl.create({
      component: ModalInfoPage,
      componentProps: {
        nombre: "Jose",
        pais: "Perú",
      }
    });

    await modal.present();

    // const resp = await modal.onDidDismiss();
    const resp = await modal.onWillDismiss();


    console.log( resp );

  }
}
