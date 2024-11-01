import { Component, inject, OnInit } from '@angular/core';
import { DataService } from './services/data.service';
import { Componente } from './interfaces/interfaces';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{

  private dataService: DataService = inject(DataService);
  public componentes?: Observable<Componente[]>;

  ngOnInit(): void {
    this.componentes = this.dataService.getMenuOpts();
  }

}
