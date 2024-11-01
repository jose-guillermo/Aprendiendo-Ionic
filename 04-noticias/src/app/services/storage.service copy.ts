import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Article } from '../interfaces/index.interface';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  async addFavorite( newFavorite: Article) {
    const currentFavorites = await this.getAllFavorites();

    let favorites: Article[] = [];

    if( currentFavorites === "") {
      favorites = [ newFavorite ];
    } else {
      favorites = [ ...currentFavorites, newFavorite ];
    }
    await Preferences.set({
      key: "favorites",
      value: JSON.stringify(favorites),
    });
  }

  async getAllFavorites(){
    const { value } = await Preferences.get({ key: "favorites" });

    if ( !value )
      return "";
    return JSON.parse(value);
  }

  async isFavorite(article: Article) {
    const currentFavorites = await this.getAllFavorites();
    if (currentFavorites === ""){
      return false;
    }

    if(currentFavorites.some((favorite : Article) => favorite.title === article.title))
      return true;

    return false;
  }

  async removeFavorite(removeFavorite: Article | "") {
    if( removeFavorite === "")
      return;

    const currentFavorites: Article[] = await this.getAllFavorites();

    const favorites: Article[] = currentFavorites.filter( favorite => favorite.title != removeFavorite.title );

    await Preferences.set({
      key: "favorites",
      value: JSON.stringify(favorites),
    });
  }
}
