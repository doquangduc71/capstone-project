import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Admin } from '../model/admin';
import { Doctor } from '../model/doctor';
import { Medicine } from '../model/medicine';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private header: any;
  private baseUrl= "http://localhost:8080/api/v1";
  
  constructor(private httpClient: HttpClient) { 
    this.header = new Headers( {'Content-Type' : 'application/context'})
  }
  
  getMedicineList(index:number):Observable<Medicine[]>{
    return this.httpClient.get<Medicine[]>(`${this.baseUrl}/medicines?index=${index}`);
  }
  getDoctorById(id:number):Observable<Doctor>{
    return this.httpClient.get<Doctor>(`${this.baseUrl}/doctor/${id}`);
  }
  getNumberOfMedicine():Observable<number>{
    return this.httpClient.get<number>(`${this.baseUrl}/numberOfMedicine`);
  }
  getDoctorList(index:number,searchText:string):Observable<Doctor[]>{
    return this.httpClient.get<Doctor[]>(`${this.baseUrl}/doctor?index=${index}&searchText=${searchText}`);
  }
  getNumberOfDoctor(searchText:string):Observable<number>{
    return this.httpClient.get<number>(`${this.baseUrl}/doctor/numberOfDoctor?searchText=${searchText}`);
  }
  login(formData:FormGroup) {
    
    return this.httpClient.post(`${this.baseUrl}/auth/loginForAdmin`,formData);
  }
  updateStatus(isActive:number,id:number,expireDate:any){
    return this.httpClient.put(`${this.baseUrl}/user/updateStatus?isActive=${isActive}&id=${id}&expireDate=${expireDate}`,isActive&id&expireDate);
  }
  getAdminInfor(id:number){
    return this.httpClient.get<Admin>(`${this.baseUrl}/user/${id}`);
  }
}
