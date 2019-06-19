import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { PMLayoutComponent } from './layouts/pm-layout/pm-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { SensorVersionListComponent } from './sensor-version-list/sensor-version-list.component';

import { PmProgressBarComponent } from './components/pm-progress-bar/pm-progress-bar.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { QrQameleoComponent } from './pages/qr-qameleo/qr-qameleo.component';
import { sensorVersionService } from './pages/sensor-version/sensor-version-service';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    NgCircleProgressModule.forRoot({})
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    PMLayoutComponent,
    SensorVersionListComponent,
    PmProgressBarComponent,
    QrQameleoComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
