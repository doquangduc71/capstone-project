import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Admin } from '../model/admin';
import { Appointment } from '../model/appointment';
import { Doctor } from '../model/doctor';
import { Medicine } from '../model/medicine';
import { Patient } from '../model/patient';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private header: any;
  //private baseUrl= "http://localhost:8080/api/v1";
  private baseUrl = "https://telecare-doxr4lwcja-as.a.run.app/api/v1";
  
  constructor(private httpClient: HttpClient) { 
    this.header = new Headers( {'Content-Type' : 'application/context'})
  }
  
  getMedicineList(index:number,searchText:string):Observable<Medicine[]>{
    return this.httpClient.get<Medicine[]>(`${this.baseUrl}/medicine/getAll?index=${index}&searchText=${searchText}`);
  }
  getDoctorById(id:number):Observable<Doctor>{
    return this.httpClient.get<Doctor>(`${this.baseUrl}/doctor/${id}`);
  }
  getPatientById(id:number):Observable<Patient>{
    return this.httpClient.get<Patient>(`${this.baseUrl}/patient?id=${id}`);
  }
  getNumberOfMedicine(searchText:string):Observable<number>{
    return this.httpClient.get<number>(`${this.baseUrl}/medicine/numberOfMedicine?searchText=${searchText}`);
  }
  getDoctorList(index:number,searchText:string):Observable<Doctor[]>{
    return this.httpClient.get<Doctor[]>(`${this.baseUrl}/doctor?index=${index}&searchText=${searchText}`);
  }
  getNumberOfDoctor(searchText:string):Observable<number>{
    return this.httpClient.get<number>(`${this.baseUrl}/doctor/numberOfDoctor?searchText=${searchText}`);
  }
  getAppointmentList(index:number,searchText:string):Observable<Appointment[]>{
    return this.httpClient.get<Appointment[]>(`${this.baseUrl}/appointment/getAll?index=${index}&searchText=${searchText}`);
  }
  getNumberOfAppointment(searchText:string):Observable<number>{
    return this.httpClient.get<number>(`${this.baseUrl}/appointment/numberOfAppointment?searchText=${searchText}`);
  }
  getPatientList(index:number,searchText:string):Observable<Patient[]>{
    return this.httpClient.get<Patient[]>(`${this.baseUrl}/patient/getAll?index=${index}&searchText=${searchText}`);
  }
  getNumberOfPatient(searchText:string):Observable<number>{
    return this.httpClient.get<number>(`${this.baseUrl}/patient/numberOfPatient?searchText=${searchText}`);
  }
  login(formData:FormGroup) {
    
    return this.httpClient.post(`${this.baseUrl}/auth/loginForAdmin`,formData);
  }
  updateStatus(isActive:number,id:number,expireDate:any,reason:any){
    return this.httpClient.put(`${this.baseUrl}/user/updateStatus?isActive=${isActive}&id=${id}&expireDate=${expireDate}&reason=${reason}`,isActive&id&expireDate&reason);
  }
  updateStatusForPatient(isActive:number,id:number,reason:any){
    return this.httpClient.put(`${this.baseUrl}/user/updateStatusForPatient?isActive=${isActive}&id=${id}&reason=${reason}`,isActive&id&reason);
  }
  getAdminInfor(id:number){
    return this.httpClient.get<Admin>(`${this.baseUrl}/user/${id}`);
  }
}
