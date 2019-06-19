import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { PMLayoutRoutes } from './pm-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SensorVersionPage } from '../../pages/sensor-version/sensor-version.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {ComponentsModule} from '../../components/components.module';
import { DiagrammeComponent } from '../../pages/diagramme/diagramme.component';
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
    ComponentsModule,
    CircleProgressOptions,
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300
    }),
    
  ],
  declarations: [
  
    DashboardComponent,
    UserProfileComponent,
    MapsComponent,
    SensorVersionPage,
    DiagrammeComponent,
    NgCircleProgressModule
  ],
  exports: [
    
  ],
  providers:[sensorVersionService]
})

export class PMLayoutComponent {}
