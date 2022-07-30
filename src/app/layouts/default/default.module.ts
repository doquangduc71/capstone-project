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
import { PatientListComponent } from 'src/app/modules/patient-list/patient-list.component';
import { PatientDetailsComponent } from 'src/app/modules/patient-details/patient-details.component';
import { AppointmentListComponent } from 'src/app/modules/appointment-list/appointment-list.component';
import { AngularFireModule  } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AngularFireStorage, AngularFireStorageModule } from '@angular/fire/compat/storage';
import firebase from "firebase/compat/app";

import { MedicalRecordsHistoryComponent } from 'src/app/modules/medical-records-history/medical-records-history.component';
import { ChangePasswordComponent } from 'src/app/modules/change-password/change-password.component';


const firebaseConfig ={
  apiKey: "AIzaSyDLGYZDO2FgCKP2fuKbDGUEggosgYYCyPk",
  authDomain: "telecare-chat-storing.firebaseapp.com",
  projectId: "telecare-chat-storing",
  storageBucket: "telecare-chat-storing.appspot.com",
  messagingSenderId: "57707879800",
  appId: "1:57707879800:web:fdc10a07ecc25349fe7c8d",
  measurementId: "G-PSCL32HGWK"
}

@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    DoctorListComponent,
    MedicineListComponent,
    DoctorDetailsComponent,
    PatientListComponent,
    PatientDetailsComponent,
    AppointmentListComponent,
    MedicalRecordsHistoryComponent,
    ChangePasswordComponent,
    
    
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseConfig),
    CommonModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    
    AngularFireStorageModule,
    
    
    
    
    
  ],
 
})
export class DefaultModule { }
