import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

import { DefaultComponent } from './layouts/default/default.component';
import { LoginComponent } from './layouts/login/login.component';
import { AppointmentListComponent } from './modules/appointment-list/appointment-list.component';
import { ChangePasswordComponent } from './modules/change-password/change-password.component';
import { ChatListComponent } from './modules/chat-list/chat-list.component';

import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { DoctorDetailsComponent } from './modules/doctor-details/doctor-details.component';
import { DoctorListComponent } from './modules/doctor-list/doctor-list.component';
import { MedicalRecordsHistoryComponent } from './modules/medical-records-history/medical-records-history.component';
import { MedicineListComponent } from './modules/medicine-list/medicine-list.component';
import { PatientDetailsComponent } from './modules/patient-details/patient-details.component';
import { PatientListComponent } from './modules/patient-list/patient-list.component';
import { PaymentComponent } from './modules/payment/payment.component';


const routes: Routes = [
  {path:'home',component:DefaultComponent,canActivate:[AuthGuard],
children:[
  { path:'',component:DashboardComponent },
  { path:'doctor-list',
  children:[
    {path:'',component:DoctorListComponent},
    {path:':id',component:DoctorDetailsComponent},
    
  ]
},
{ path:'patient-list',
  children:[
    {path:'',component:PatientListComponent},
    {path:':id',component:PatientDetailsComponent},
    
  ]
},
  { path:'medical-records',component:MedicalRecordsHistoryComponent},
  { path:'medicine-list',component:MedicineListComponent},
  { path:'appointment-list',component:AppointmentListComponent},
  { path:'change-password',component:ChangePasswordComponent},
  { path:'chat-list',component:ChatListComponent},
  { path:'payment',component:PaymentComponent},
  ]
  },
  {path:'login',component:LoginComponent},
  {path: "",redirectTo:'login',pathMatch:'full'},
  {path: "**",redirectTo:'login',pathMatch:'full'}


  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
