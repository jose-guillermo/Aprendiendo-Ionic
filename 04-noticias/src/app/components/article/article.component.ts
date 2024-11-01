import { Component, EventEmitter, inject, Input, OnInit, Output, signal } from '@angular/core';
import { Article } from 'src/app/interfaces/index.interface';
import { InAppBrowser } from '@capacitor/inappbrowser';
import { Capacitor } from '@capacitor/core';
import { ActionSheetController } from '@ionic/angular';
import { Share } from '@capacitor/share';
import { StorageService } from '../../services/storage.service';


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent{


  @Input({required: true}) article!: Article;
  @Input({required: true}) index!: number;

  private storageService: StorageService = inject(StorageService);
  private actionSheetCtrl: ActionSheetController = inject(ActionSheetController);

  async openArticle() {
    if (Capacitor.getPlatform() !== "web") {
      await InAppBrowser.openInExternalBrowser({
        url: this.article.url
      });
    }

    window.open(this.article.url, "_blank");

    // await InAppBrowser.openInSystemBrowser({
    //   url: this.article.url,
    //   options: DefaultSystemBrowserOptions
    // });
  }

  async onShareArticle() {
    await Share.share({
      title: this.article.title,
      text: this.article.description,
      url: this.article.url,
      dialogTitle: 'Compartirlo con amigos',
    });
  }

  onToggleFavorite(){
    this.storageService.saveRemoveArticle(this.article);
  }

  async presentActionSheet(){

    const articleInFavorite = this.storageService.articleInFavorites(this.article);

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Actions',
      buttons: ([
        {
          text: "Compartir",
          icon: "share-outline",
          handler: () => this.onShareArticle(),
          data: {
            action: "share"
          }
        },
        {
          text: 'cancelar',
          icon: 'close-outline',
          role: "cancel",
        },
        {
          text: articleInFavorite ? 'Remover favorito' : 'Favorito',
          icon: articleInFavorite ? 'heart' : 'heart-outline',
          handler: () => this.onToggleFavorite()
        }

      ]),
    });

    await actionSheet.present();
  }
}
