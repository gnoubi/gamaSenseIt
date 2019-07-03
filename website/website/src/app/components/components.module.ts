import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { from } from 'rxjs';

import { MatIconModule,
  MatAutocompleteModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatTabsModule,
  MatExpansionModule,
  MatTooltipModule } from '@angular/material';

import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { SensorVersionComponent } from './sensor-version/sensor-version.component';
import { SensorVersionFormService } from './sensor-version/sensor-version-form-service';
import { QrQameleoFooterComponent } from './qr-qameleo-footer/qr-qameleo-footer.component';
import { QrcodeReaderService } from './upload-qrcode/qrcode-reader.service';
import { UploadQrcodeComponent } from './upload-qrcode/upload-qrcode.component';
import { SensorVersionService } from '../pages/sensor-version/sensor-version-service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTabsModule,
    MatExpansionModule,
    MatTooltipModule
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    SensorVersionComponent,
    QrQameleoFooterComponent,
    UploadQrcodeComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    SensorVersionComponent,
    QrQameleoFooterComponent,
    UploadQrcodeComponent,
    ReactiveFormsModule,
    MatIconModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTabsModule,
    MatExpansionModule,
    MatTooltipModule
  ],
  providers:[
    SensorVersionFormService,
    SensorVersionService,
    QrcodeReaderService
  ]
})
export class ComponentsModule { }
