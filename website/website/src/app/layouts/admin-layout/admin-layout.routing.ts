import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { SensorVersionPage } from '../../pages/sensor-version/sensor-version.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: SensorVersionPage },
    { path: 'tables',         component: SensorVersionPage },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: SensorVersionPage }
];
