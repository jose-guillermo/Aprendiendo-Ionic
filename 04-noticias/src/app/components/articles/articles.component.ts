import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Article } from 'src/app/interfaces/index.interface';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent  implements OnInit {

  @Input({required: true}) articles!: Article[];
  @Output() favoritesMod = new EventEmitter<Article>();

  constructor() { }

  ngOnInit() {}

  emitMod( article: Article ){
    console.log(article);
    this.favoritesMod.emit(article);
  }
}
