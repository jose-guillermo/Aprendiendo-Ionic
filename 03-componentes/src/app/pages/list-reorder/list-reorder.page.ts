import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-reorder',
  templateUrl: './list-reorder.page.html',
  styleUrls: ['./list-reorder.page.scss'],
})
export class ListReorderPage{

  public personajes: String[] = ["Aquaman", "Superman", "Batman", "Mujer Maravilla", "Flash"];

  public toggle: boolean = false;
  
  doReorder( event: any){
    console.log(event);
    event.detail.complete( this.personajes );
    console.log(this.personajes);
  }
}
