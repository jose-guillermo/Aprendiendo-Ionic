import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SegmentPageRoutingModule } from './segment-routing.module';

import { SegmentPage } from './segment.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { FiltroPipe } from 'src/app/pipes/filtro.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SegmentPageRoutingModule,
    ComponentsModule,
    FiltroPipe,
  ],
  declarations: [SegmentPage]
})
export class SegmentPageModule {}
