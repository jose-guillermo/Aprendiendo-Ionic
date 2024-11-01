import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Article, NewsResponse } from 'src/app/interfaces/index.interface';
import { NewsService } from 'src/app/services/news.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  @ViewChild( IonInfiniteScroll, { static: true } ) infiniteScroll!: IonInfiniteScroll;
  public apikey = environment.apiKey;

  public articles = signal<Article[]>([]);

  private newsService: NewsService = inject(NewsService);

  ngOnInit(){
    this.newsService.getTopHeadlinesByCategory("business")
      .subscribe(
        articles => {this.articles.set(articles)},
      )
  }

  loadData() {
    this.newsService.getTopHeadlinesByCategory( "business", true )
      .subscribe( articles => {

        if ( articles.length === this.articles.length) {
          this.infiniteScroll.disabled = true;
          // event.target.disabled = true;
          return;
        }
        this.articles.set( articles );
        this.infiniteScroll.complete();
        // event.target.complete();
      })
  }
}
