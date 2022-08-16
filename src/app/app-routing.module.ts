import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { BusinessRoleGuard } from './auth/business-role.guard';
import { SystemRoleGuard } from './auth/system-role.guard';

import { DefaultComponent } from './layouts/default/default.component';
import { LoginComponent } from './layouts/login/login.component';
import { AppointmentDetailsComponent } from './modules/appointment-details/appointment-details.component';
import { AppointmentListDetailsComponent } from './modules/appointment-list-details/appointment-list-details.component';
import { AppointmentListComponent } from './modules/appointment-list/appointment-list.component';
import { ChangePasswordComponent } from './modules/change-password/change-password.component';
import { ChatListComponent } from './modules/chat-list/chat-list.component';

import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { DoctorDetailsComponent } from './modules/doctor-details/doctor-details.component';
import { DoctorListComponent } from './modules/doctor-list/doctor-list.component';
import { ListedPriceListComponent } from './modules/listed-price-list/listed-price-list.component';
import { MedicalRecordsHistoryComponent } from './modules/medical-records-history/medical-records-history.component';
import { MedicineListComponent } from './modules/medicine-list/medicine-list.component';
import { PatientDetailsComponent } from './modules/patient-details/patient-details.component';
import { PatientListComponent } from './modules/patient-list/patient-list.component';
import { PaymentComponent } from './modules/payment/payment.component';
import { ReportListComponent } from './modules/report-list/report-list.component';
import { ErrorPageComponent } from './shared/component/error-page/error-page.component';


const routes: Routes = [
  {path:'home',component:DefaultComponent,canActivate:[AuthGuard],
children:[
  { path:'',component:DashboardComponent },
  { path:'doctor-list',
  children:[
    {path:'',component:DoctorListComponent,canActivate:[SystemRoleGuard]},
    {path:':id',component:DoctorDetailsComponent},
    
  ]
},
{ path:'patient-list',
  children:[
    {path:'',component:PatientListComponent,canActivate:[SystemRoleGuard]},
    {path:':id',component:PatientDetailsComponent},
    
  ]
},
  { path:'medical-records',component:MedicalRecordsHistoryComponent,canActivate:[SystemRoleGuard]},
  { path:'medicine-list',component:MedicineListComponent,canActivate:[SystemRoleGuard]},
  { path:'appointment-list',
  children:[
    {path:'',component:AppointmentListComponent,canActivate:[SystemRoleGuard]},
    {path:':id',component:AppointmentDetailsComponent}
  ] 
  },
  { path:'change-password',component:ChangePasswordComponent},
  { path:'chat-list',component:ChatListComponent,canActivate:[SystemRoleGuard]},
  { path:'payment',component:PaymentComponent,canActivate:[BusinessRoleGuard]},
  { path:'listed-price-list',component:ListedPriceListComponent,canActivate:[BusinessRoleGuard]},
  { path:'report-list',component:ReportListComponent,canActivate:[SystemRoleGuard]},
  { path:'appointment-list-details',component:AppointmentListDetailsComponent,canActivate:[SystemRoleGuard]},
  { path:'error',component:ErrorPageComponent},
  {path: "**",redirectTo:'home/error',pathMatch:'full'}
  ]
  },
  {path:'login',component:LoginComponent},
  {path: "",redirectTo:'login',pathMatch:'full'},
  {path: "**",redirectTo:'home/error',pathMatch:'full'}


  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
