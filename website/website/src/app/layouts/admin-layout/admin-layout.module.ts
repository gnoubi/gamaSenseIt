import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SensorVersionPage } from '../../pages/sensor-version/sensor-version.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {ComponentsModule} from '../../components/components.module';
import { DiagrammeComponent } from '../../pages/diagramme/diagramme.component';
import { sensorVersionService } from '../../pages/sensor-version/sensor-version-service';




// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
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
  
    DashboardComponent,
    UserProfileComponent,
    TablesComponent,
    MapsComponent,
    SensorVersionPage,
    DiagrammeComponent    
  ],
  exports: [
    
  ],
  providers:[sensorVersionService]
})

export class AdminLayoutModule {}