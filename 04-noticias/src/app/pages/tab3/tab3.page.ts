import { Component, inject, OnInit, signal } from '@angular/core';
import { Article } from 'src/app/interfaces/index.interface';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page{

  private storageService: StorageService = inject(StorageService);


  get articles(): Article[] {
    return this.storageService.getLocalArticles;
  }



















  // async modFavorites( emitArticle: Article){

  //   this.articles.update( articles => {
  //     articles = articles.filter( article => article.title != emitArticle.title )
  //     return articles;
  //   })

  //   console.log("emision recibida");
  //   console.log(this.articles());
  // }

}
