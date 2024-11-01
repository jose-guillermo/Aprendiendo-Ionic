import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Post } from '../interfaces/posts.interface';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {


  private http: HttpClient = inject(HttpClient);

  getPosts(){
    return this.http.get<Post[]>("https://jsonplaceholder.typicode.com/posts")
      .pipe(
        tap( posts => {
          console.log(posts);
        })
      )
  }
}
