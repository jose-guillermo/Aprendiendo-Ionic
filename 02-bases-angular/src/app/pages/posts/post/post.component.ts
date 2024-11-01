import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Post } from '../../../interfaces/posts.interface';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {
  @Input({ required: true }) mensaje!: Post;

  @Output() clickPost: EventEmitter<number> = new EventEmitter();

  emitId(): void {
    this.clickPost.emit( this.mensaje.id );
  }
}
