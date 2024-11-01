import { Component, inject } from '@angular/core';
import { ActionSheetButton, ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-action-sheet',
  templateUrl: './action-sheet.page.html',
  styleUrls: ['./action-sheet.page.scss'],
})
export class ActionSheetPage {

  public actionSheetButtons: ActionSheetButton[] = [
    {
      text: 'Delete',
      role: 'destructive',
      icon: "trash-outline",
      cssClass: "rojo",
      data: {
        action: 'delete',
      },
    },
    {
      text: 'Share',
      icon: "share-outline",
      data: {
        action: 'share',
      },
    },
    {
      text: 'Cancel',
      role: 'cancel',
      icon: "close-outline",
      data: {
        action: 'cancel',
      },
    },
  ];

  private actionSheetCtrl = inject(ActionSheetController);

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Albumes',
      backdropDismiss: false,
      buttons: this.actionSheetButtons,
    });

    await actionSheet.present();
  }

}
