import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { DashboardComponent }       from '../../pages/dashboard/dashboard.component';
import { UserComponent }            from '../../pages/user/user.component';
import { ConsultatiiComponent }            from '../../pages/consultatii/consultatie.component';
import { AdaugaActivitateComponent }            from '../../pages/adaugaActivitate/user.component';
import { TableComponent }           from '../../pages/table/table.component';
import { PacientComponent }           from '../../pages/pacientNou/pacient.component';
import { TableProgramComponent }    from '../../pages/tableProgram/program.component';
import { DashboardSaloaneComponent }       from '../../pages/dashboardSaloane/dashboard.component';
import { TypographyComponent }      from '../../pages/typography/typography.component';
import { IconsComponent }           from '../../pages/icons/icons.component';
import { MapsComponent }            from '../../pages/maps/maps.component';
import { NotificationsComponent }   from '../../pages/notifications/notifications.component';
import { UpgradeComponent }         from '../../pages/upgrade/upgrade.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PacientInfoComponent } from 'app/pages/pacientInfo/info.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    NgbModule
  ],
  declarations: [
    DashboardComponent,
    ConsultatiiComponent,
    AdaugaActivitateComponent,
    UserComponent,
    TableComponent,
    PacientInfoComponent,
    PacientComponent,
    TableProgramComponent,
    DashboardSaloaneComponent,
    UpgradeComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
  ]
})

export class AdminLayoutModule {}
