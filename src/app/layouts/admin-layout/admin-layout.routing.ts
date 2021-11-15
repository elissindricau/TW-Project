import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { ConsultatiiComponent } from '../../pages/consultatii/user.component';
import { AdaugaActivitateComponent } from '../../pages/adaugaActivitate/user.component';
import { UserComponent } from '../../pages/user/user.component';
import { TableComponent } from '../../pages/table/table.component';
import { TableProgramComponent } from '../../pages/tableProgram/table.component';
import { DashboardSaloaneComponent } from '../../pages/dashboardSaloane/dashboard.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'consultatii',    component: ConsultatiiComponent },
    { path: 'adaugaActivitate',    component: AdaugaActivitateComponent },
    { path: 'user',           component: UserComponent },
    { path: 'table',          component: TableComponent },
    { path: 'tableProgram',   component: TableProgramComponent },
    { path: 'dashboardSaloane',      component: DashboardSaloaneComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent }
];
