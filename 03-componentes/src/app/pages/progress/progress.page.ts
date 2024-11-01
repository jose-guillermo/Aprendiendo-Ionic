import { Component, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.page.html',
  styleUrls: ['./progress.page.scss'],
})
export class ProgressPage implements OnInit {
  public porcentaje = signal(0.05);

  constructor() { }

  ngOnInit() {
  }

  rangeChange( event: CustomEvent ) {
    this.porcentaje.set( event.detail.value / 100 )
  }
}
