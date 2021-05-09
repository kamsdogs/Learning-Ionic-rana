import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActivityDetailsPageRoutingModule } from './activity-details-routing.module';

import { ActivityDetailsPage } from './activity-details.page';
import { ActivityVideoPageModule } from '../activity-video/activity-video.module';

@NgModule({
  imports: [
    ActivityVideoPageModule,
    CommonModule,
    FormsModule,
    IonicModule,
    ActivityDetailsPageRoutingModule
  ],
  declarations: [ActivityDetailsPage]
})
export class ActivityDetailsPageModule {}
