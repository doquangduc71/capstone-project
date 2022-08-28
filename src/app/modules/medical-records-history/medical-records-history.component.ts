import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { map, Observable } from 'rxjs';

import { Chat, Link, ListMedicalRecordHistory, Message } from 'src/app/model/chat';
import { UserService } from 'src/app/services/user.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';



@Component({
  selector: 'app-medical-records-history',
  templateUrl: './medical-records-history.component.html',
  styleUrls: ['./medical-records-history.component.css']
})
export class MedicalRecordsHistoryComponent implements OnInit {
  chatListsRef: AngularFirestoreCollection<ListMedicalRecordHistory>;
  messageListRef:AngularFirestoreCollection<Message>;
  chatList: ListMedicalRecordHistory[] = [];
  chatListTemp: ListMedicalRecordHistory[] = [];
  messageList:Link[]=[];
  
  selectedChatRoomId:string;
  constructor(private firestore: AngularFirestore, public chatsService: UserService) { }
 

  ngOnInit(): void {
    
    this.chatListsRef = this.firestore.collection<ListMedicalRecordHistory>('pdf', ref => ref.orderBy('appointmentId','desc'));
    this.chatListsRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({

          id: c.payload.doc.id, ...c.payload.doc.data()
        })
        )),

    ).subscribe((data: any) => {
      this.chatList = data;
      this.chatListTemp=this.chatList;

});
    
  }
  getMedicalRecordChange(id:string){
    this.chatList.forEach(chat=>{
      if(chat.appointmentId===id){
        
        this.selectedChatRoomId=chat.appointmentId;
        
      }
    })
    this.messageListRef = this.firestore.collection<Message>(`pdf/${id}/history`, ref => ref.orderBy('time','desc'));
    this.messageListRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({

          id: c.payload.doc.id, ...c.payload.doc.data()
        })
        )),
    ).subscribe((data: any)=>{
      this.messageList=data;
      
      
    })
      
  }
  searchPhone(){
    const searchText=(<HTMLInputElement>document.getElementById("searchText")).value;
    
    if(searchText==""){
      this.ngOnInit();
    }
    this.chatList=this.chatListTemp
    this.chatList=this.chatList.filter(res=>{
      
      return String(res.appointmentId).includes(searchText) ||  String(res.doctorName.toLocaleLowerCase()).includes(searchText.toLocaleLowerCase()) ;
    })
  }
 



}
