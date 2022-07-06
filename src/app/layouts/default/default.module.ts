import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DefaultComponent } from './default.component';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { DoctorListComponent } from 'src/app/modules/doctor-list/doctor-list.component';

import { SharedModule } from 'src/app/shared/shared.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DoctorDetailsComponent } from 'src/app/modules/doctor-details/doctor-details.component';
import { MedicineListComponent } from 'src/app/modules/medicine-list/medicine-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import {MatTabsModule} from '@angular/material/tabs';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    DoctorListComponent,
    MedicineListComponent,
    DoctorDetailsComponent,
    
    
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTabsModule,
    MatProgressSpinnerModule
    
  ]
})
export class DefaultModule { }
