import { Component, inject, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-info',
  templateUrl: './modal-info.page.html',
  styleUrls: ['./modal-info.page.scss'],
})
export class ModalInfoPage implements OnInit {

  @Input({required: true}) nombre!: string;
  @Input({required: true}) pais!: string;
  private modalCtrl: ModalController = inject(ModalController);

  constructor() { }

  ngOnInit() {
  }

  salirSinArgumentos() {
    this.modalCtrl.dismiss();
  }

  salirConArgumentos() {
    this.modalCtrl.dismiss({
      nombre: "Jose",
      pais: "España",
    });
  }

}
