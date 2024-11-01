import { Component, inject, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popover-info',
  templateUrl: './popover-info.component.html',
  styleUrls: ['./popover-info.component.scss'],
})
export class PopoverInfoComponent  implements OnInit {

  public items = new Array(40);

  private popoverCtrl: PopoverController = inject(PopoverController);

  ngOnInit() {}

  onClick(valor: number){
    this.popoverCtrl.dismiss({
      item: valor
    });
  }

}
