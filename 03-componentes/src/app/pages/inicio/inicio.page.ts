import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { Componente } from "../../interfaces/interfaces"

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  public componentes?: Observable<Componente[]>;
  private dataService: DataService = inject(DataService);

  // private menuCtrl: MenuController = inject(MenuController);

  // mostrarMenu() {
  //   this.menuCtrl.open("first");
  // }

  ngOnInit() {
    this.componentes = this.dataService.getMenuOpts();
  }

}
