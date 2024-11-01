import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SlidesPageRoutingModule } from './slides-routing.module';

import { SlidesPage } from './slides.page';
// import Swiper from 'swiper';
// import 'swiper/swiper-bundle.css';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SlidesPageRoutingModule,
  ],
  schemas:[ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [SlidesPage]
})
export class SlidesPageModule {}
