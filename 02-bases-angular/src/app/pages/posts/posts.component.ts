import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Post } from '../../interfaces/posts.interface';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})
export class PostsComponent implements OnInit, OnDestroy {


  public mensajes: Post[] = [];
  public subscription?: Subscription;

  private dataService: DataService = inject(DataService);

  ngOnInit(): void {

    this.subscription = this.dataService.getPosts()
      .subscribe( posts => {
        this.mensajes = posts;
      })
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  showId(id: number): void {
    console.log(id);
  }
}
