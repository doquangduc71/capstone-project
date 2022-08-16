import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { concatMap, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Admin } from '../model/admin';
import { Appointment } from '../model/appointment';
import { Chat, Message } from '../model/chat';
import { Dashboard } from '../model/dashboard';
import { Doctor } from '../model/doctor';
import { Feedback } from '../model/feedback';
import { ListedPrice } from '../model/listed-price';
import { Medicine } from '../model/medicine';
import { Patient } from '../model/patient';

import { Payment } from '../model/payment';
import { Report } from '../model/report';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private header: any;
  //private baseUrl= "http://localhost:8080/api/v1/admin";
  private baseUrl = "https://telecare-doxr4lwcja-et.a.run.app/api/v1/admin";
  
  constructor(private httpClient: HttpClient) { 
    this.header = new Headers( {'Content-Type' : 'application/context'})
    
  }
  login(formData:FormGroup) {
    
    return this.httpClient.post(`https://telecare-doxr4lwcja-et.a.run.app/api/v1/auth/loginForAdmin`,formData);
  }
  // login(formData:FormGroup) {
    
  //   return this.httpClient.post(`http://localhost:8080/api/v1/auth/loginForAdmin`,formData);
  // }
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
  
  updateStatus(isActive:number,id:number,expireDate:any,reason:any){
    return this.httpClient.put(`${this.baseUrl}/user/updateStatus?isActive=${isActive}&id=${id}&expireDate=${expireDate}&reason=${reason}`,isActive&id&expireDate&reason);
  }
  updateStatusForPatient(isActive:number,id:number,reason:any){
    return this.httpClient.put(`${this.baseUrl}/user/updateStatusForPatient?isActive=${isActive}&id=${id}&reason=${reason}`,isActive&id&reason);
  }
  getAdminInfor(id:number){
    return this.httpClient.get<Admin>(`${this.baseUrl}/user/${id}`);
  }
  changePassword(id:number,oldPassword:any,newPassword:any){
    return this.httpClient.put(`${this.baseUrl}/auth/changePassword?id=${id}&password=${oldPassword}&newPassword=${newPassword}`,id&oldPassword&newPassword);
  }
  sendNotificationFromAdmin(id:number,content:any){
    return this.httpClient.post(`${this.baseUrl}/doctor/sendNotificationFromAdmin?id=${id}&content=${content}`,id&content);
  }
  getPaymentList(index:number,searchText:string):Observable<Payment[]>{
    return this.httpClient.get<Payment[]>(`${this.baseUrl}/payment/getAll?index=${index}&searchText=${searchText}`);
  }
  getNumberOfPayment(searchText:string):Observable<number>{
    return this.httpClient.get<number>(`${this.baseUrl}/payment/numberOfPayment?searchText=${searchText}`);
  }
  getReportList(index:number,searchText:string):Observable<Report[]>{
    return this.httpClient.get<Report[]>(`${this.baseUrl}/report/getAll?index=${index}&searchText=${searchText}`);
  }
  getNumberOfReport(searchText:string):Observable<number>{
    return this.httpClient.get<number>(`${this.baseUrl}/report/numberOfReport?searchText=${searchText}`);
  }
  updateStatusForReport(reportId:number,statusId:number){
    return this.httpClient.put(`${this.baseUrl}/report/updateStatus?reportId=${reportId}&statusId=${statusId}`,reportId&statusId);
  }
  getAppointmentDetails(id:number){
    return this.httpClient.get<Appointment>(`${this.baseUrl}/appointment/detail/${id}`);
  }
  getAppointmentListDetails(index:number,searchText:string):Observable<Appointment[]>{
    return this.httpClient.get<Appointment[]>(`${this.baseUrl}/appointmentDetails/getAll?index=${index}&searchText=${searchText}`);
  }
  getNumberOfAppointmentDetails(searchText:string):Observable<number>{
    return this.httpClient.get<number>(`${this.baseUrl}/appointmentDetails/numberOfAppointment?searchText=${searchText}`);
  }
  getFeedbackByAppointmentId(id:number):Observable<Feedback>{
    return this.httpClient.get<Feedback>(`${this.baseUrl}/feedback/appointmentId=${id}`);
  }
  updateStatusFeedback(id:number,status:number){
    return this.httpClient.put(`${this.baseUrl}/feedback/updateStatus?id=${id}&status=${status}`,id&status);
  }
  sendNotificationToAllUser(role:any,money:number,message:any){
    if(role==="SYSTEM ADMIN"){
      money=0;
    }
    return this.httpClient.post(`${this.baseUrl}/notification/sendAll?role=${role}&money=${money}&message=${message}`,role&money&message);
  }
  getListedPriceList(index:number,searchText:string):Observable<ListedPrice[]>{
    return this.httpClient.get<ListedPrice[]>(`${this.baseUrl}/listedPrice/getAll?index=${index}&searchText=${searchText}`);
  }
  getNumberOfListedPrice(searchText:string):Observable<number>{
    return this.httpClient.get<number>(`${this.baseUrl}/listedPrice/numberOfListedPrice?searchText=${searchText}`);
  }
  getDashBoardData():Observable<Dashboard>{
    return this.httpClient.get<Dashboard>(`${this.baseUrl}/dashboard`);
  }
  



  
  
 
  
}
