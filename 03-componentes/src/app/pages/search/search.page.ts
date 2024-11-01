import { Component, inject, OnInit, signal } from '@angular/core';
import { tap } from 'rxjs';
import { Album } from 'src/app/interfaces/album.interface';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  public albumes: Album[] = [];
  public textoBuscar = signal("");

  private dataService: DataService = inject(DataService);

  ngOnInit() {
    this.dataService.getAlbums()
      .subscribe(
        data => this.albumes = data
      );
  }

  onSearchChange( event: any) {
    // console.log( event );
    this.textoBuscar.set(event.detail.value);
  }

}
