import { Component, inject, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.page.html',
  styleUrls: ['./loading.page.scss'],
})
export class LoadingPage {

  public loading?: HTMLIonLoadingElement;
  private loadingCtrl: LoadingController = inject(LoadingController);

  mostrarLoading(){
    this.showLoading("Hola mundo");
    setTimeout(() => {
      this.loading?.dismiss();
      console.log("hola");

    }, 2000)
  }

  async showLoading(message: string) {
    this.loading = await this.loadingCtrl.create({
      message,
    });

    this.loading.present();
  }
}
