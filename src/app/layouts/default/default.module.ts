import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
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
import { ChatListComponent } from 'src/app/modules/chat-list/chat-list.component';
import {MatListModule} from '@angular/material/list';
import { DateDisplayPipe } from 'src/app/pipes/date-display.pipe';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { PaymentComponent } from 'src/app/modules/payment/payment.component';

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
    ChatListComponent,
    DateDisplayPipe,
    PaymentComponent,
    
    
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
    MatListModule,
    AngularFireStorageModule,
    MatFormFieldModule,
    MatAutocompleteModule
    
    
    
    
  ],
  providers:[DatePipe]
 
})
export class DefaultModule { }
