import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExplorePageRoutingModule } from './explore-routing.module';

import { ExplorePage } from './explore.page';
import { TaskElementComponent } from '../task-element/task-element.component';
import { SearchPipe } from 'src/app/search.pipe';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExplorePageRoutingModule,
    SearchPipe
  ],
  declarations: [ExplorePage, TaskElementComponent]
})
export class ExplorePageModule {}
