import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-refresher',
  templateUrl: './refresher.page.html',
  styleUrls: ['./refresher.page.scss'],
})
export class RefresherPage implements OnInit {

  public items: any[] = [];
  public refresh: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  doRefresh( event: any ) {
    console.log("Evento");
    setTimeout(() => {
      this.items = Array(20);
      event.target!.complete();
      this.refresh = true;
    }, 1500)

  }

}
