import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { SensorVersionComponent } from './sensor-version/sensor-version.component';
import {sensorVersionFormService} from './sensor-version/sensor-version-form-service'; 
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { from } from 'rxjs';
import { QrQameleoFooterComponent } from './qr-qameleo-footer/qr-qameleo-footer.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    SensorVersionComponent,
    QrQameleoFooterComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    SensorVersionComponent,
    QrQameleoFooterComponent
  ],
  providers:[sensorVersionFormService]
})
export class ComponentsModule { }
