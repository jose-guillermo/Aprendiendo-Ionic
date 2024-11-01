import { inject, Injectable, signal } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Article } from '../interfaces/index.interface';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _storage: Storage | null = null;
  private _localArticles: Article[] = [];

  private storage: Storage = inject(Storage);

  constructor() {
    this.init();
  }

  get getLocalArticles() {
    return [ ...this._localArticles ]
  }

  async init() {
    this._storage = await this.storage.create();
    this.loadFavorites();
  }

  async saveRemoveArticle( article: Article ) {

    const exists = this._localArticles.find( localArticle => localArticle.title === article.title );

    if ( exists ) {
      this._localArticles = this._localArticles.filter( localArticle => localArticle.title !== article.title );
    } else {
      this._localArticles = [ article, ...this._localArticles];
    }

    if (this._storage)
      this._storage.set('articles', this._localArticles );

  }

  async loadFavorites() {
    try {
      const articles = await this._storage!.get('articles');
      this._localArticles = articles || [];
    } catch (error) {
    }

  }

  articleInFavorites( article: Article ) {
    return !!this._localArticles.find( localArticle => localArticle.title === article.title );
  }

}
