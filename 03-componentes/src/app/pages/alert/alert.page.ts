import { Component, inject } from '@angular/core';
import { AlertButton, AlertController, AlertInput } from '@ionic/angular';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.page.html',
  styleUrls: ['./alert.page.scss'],
})
export class AlertPage {
  private alertController: AlertController = inject(AlertController);

  public alertButtons: AlertButton[] = [
    {
      text: 'Cancel',
      role: 'cancel',
      cssClass: 'rojo',
      handler: () => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: (data: any) => {
        console.log('Alert confirmed');
        console.log(data);
      },
    },
  ]

  public alertInputs: AlertInput[] = [
    {
      name: "name",
      type: "text",
      placeholder: 'Name',
    },
    {
      name: "nickname",
      placeholder: 'Nickname (max 8 characters)',
      attributes: {
        maxlength: 8,
        required: true,
      },
    },
    {
      name: "age",
      type: 'number',
      placeholder: 'Age',
      min: 1,
      max: 100,
    },
    {
      name: "date",
      type: 'date',
      min: "2015-03-01",
      max: "2025-01-12"
    },
    {
      name: "description",
      type: 'textarea',
      placeholder: 'A little about yourself',
    },
  ];


  async presentAlert() {
    const alert = await this.alertController.create({
      backdropDismiss: false,
      header: 'A Short Title Is Best',
      subHeader: 'A Sub Header Is Optional',
      message: 'A message should be a short, complete sentence.',
      buttons: ["Ok"],
    });

    await alert.present();
  }

  async presentAlertMultibuttons() {
    const alert = await this.alertController.create({
      backdropDismiss: false,
      header: 'A Short Title Is Best',
      subHeader: 'A Sub Header Is Optional',
      message: 'A message should be a short, complete sentence.',
      buttons: this.alertButtons,

    });

    await alert.present();
  }

}
