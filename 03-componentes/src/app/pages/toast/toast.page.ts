import { Component, inject, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.page.html',
  styleUrls: ['./toast.page.scss'],
})
export class ToastPage implements OnInit {
  public toastButtons = [
    {
      text: 'More Info',
      icon: "star",
      role: 'Favorite',
      handler: () => {
        console.log('Favorite clicked');
      },
    },
    {
      text: 'Done',
      role: 'cancel',
      handler: () => {
        console.log('Cancel clicked');
      },
    },
  ];

  private toastCtrl: ToastController = inject(ToastController);

  ngOnInit() {
  }

  async mostrarToast() {
    const toast = await this.toastCtrl.create({
      message: 'Hello World!',
      duration: 1500,
    });

    await toast.present();
  }
  async mostrarToastOpciones() {
    const toast = await this.toastCtrl.create({
      message: 'Hello World!',
      duration: 1500,
      position: "top",
      buttons: this.toastButtons,
    });

    await toast.present();
  }
}
