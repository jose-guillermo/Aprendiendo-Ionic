import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Article, ArticlesByCategoryAndPage, NewsResponse,} from '../interfaces/index.interface';
import { storedArticlesByCategory } from 'src/data/mock-news';


const apiUrl = environment.apiUrl;
const apiKey = environment.apiKey;



@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private articlesByCategoryAndPage = signal<ArticlesByCategoryAndPage>(storedArticlesByCategory);

  private http: HttpClient = inject(HttpClient);

  private executeQuery<T>(endpoint: string) {
    console.log('Petición HTTP realizada');
    return this.http.get<T>(`${apiUrl}${endpoint}`, {
      params: {
        apiKey,
        country: 'us',
      },
    });
  }

  // getTopHeadlines(): Observable<Article[]> {
  //   return this.executeQuery<NewsResponse>(`/top-headlines?category=business`)
  //     .pipe(
  //       map(({ articles }) => articles)
  //     );
  // }

  public getTopHeadlinesByCategory( category: string, loadMore: boolean = false ): Observable<Article[]> {
    return of(this.articlesByCategoryAndPage()[category].articles);
    if ( loadMore )
      return this.getArticlesByCategory( category );

    if ( this.articlesByCategoryAndPage()[ category ] ){
      return of(this.articlesByCategoryAndPage()[category].articles);
    }

    return this.getArticlesByCategory( category );
  }


  private getArticlesByCategory(category: string): Observable<Article[]> {

    if ( Object.keys(this.articlesByCategoryAndPage()).includes(category)) {
      // this.articlesByCategoryAndPage()[category].page += 1;
    } else {
      this.articlesByCategoryAndPage()[category] = {
        page: 0,
        articles: [],
      };
    }

    const page = this.articlesByCategoryAndPage()[category].page + 1;

    return this.executeQuery<NewsResponse>( `/top-headlines?category=${category}&page=${page}`)
      .pipe(
        map(({ articles }) => {
          if ( articles.length === 0 ) return [];

          // Eliminar los articulos que han sido eliminados
          articles = articles.filter(article => article.title != "[Removed]");

          this.articlesByCategoryAndPage()[category] = {
            page: page,
            articles: [ ...this.articlesByCategoryAndPage()[category].articles, ...articles ],
          }

          return this.articlesByCategoryAndPage()[category].articles;
        })
      );
  }
}
