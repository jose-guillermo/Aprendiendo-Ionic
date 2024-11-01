import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Article } from 'src/app/interfaces/index.interface';
import { NewsService } from 'src/app/services/news.service';

// type Category = ["business", "entertainment", "general", "health", "science", "sports", "technology"];

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  @ViewChild( IonInfiniteScroll, { static: true } ) infiniteScroll!: IonInfiniteScroll;

  public categories: string[] = ["business", "entertainment", "general", "health", "science", "sports", "technology"]
  public selectedCategory = signal(this.categories[0]);
  public articles = signal<Article[]>([]);

  private newsService: NewsService = inject(NewsService);

  ngOnInit(): void {
    // console.log(this.infiniteScroll);

    this.newsService.getTopHeadlinesByCategory( this.selectedCategory() )
      .subscribe( articles => {
        this.articles.set([ ...articles ])
      })
  }

  segmentChanged( event: CustomEvent){
    this.selectedCategory.set(event.detail.value);

    this.newsService.getTopHeadlinesByCategory( this.selectedCategory() )
      .subscribe( articles => {
        this.articles.set( [ ...articles] );
      })

  }

  loadData() {
    this.newsService.getTopHeadlinesByCategory( this.selectedCategory(), true )
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
