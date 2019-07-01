import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { ClipboardModule } from 'ngx-clipboard';

import { PMLayoutRoutes } from './pm-layout.routing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {ComponentsModule} from '../../components/components.module';
import { sensorVersionService } from '../../pages/sensor-version/sensor-version-service';


import { NgCircleProgressModule,CircleProgressOptions } from 'ng-circle-progress';


// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PMLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    ComponentsModule
    
  ],
  declarations: [
  ],
  exports: [
    
  ],
  providers:[sensorVersionService]
})

export class PMLayoutComponent {}
