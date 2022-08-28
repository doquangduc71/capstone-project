import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { map, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { Chat, Message } from 'src/app/model/chat';
import { UserService } from 'src/app/services/user.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {
  chatListsRef: AngularFirestoreCollection<Chat>;
  messageListRef:AngularFirestoreCollection<Message>;
  chatList: Chat[] = [];
  chatListTemp: Chat[] = [];
  messageList:Message[]=[];
  currentPhone:string;
  exChat:Chat;
  reciveName:string;
  currentName:string;
  selectedChatRoomId:string;
  constructor(private firestore: AngularFirestore, public chatsService: UserService) { }
 

  ngOnInit(): void {
    
    this.chatListsRef = this.firestore.collection<Chat>('chatRooms');
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
  getMessageList(id:string){
    this.chatList.forEach(chat=>{
      if(chat.chatRoomId===id){
        this.currentPhone=chat.currentPhone;
        this.reciveName=chat.receiveUsername;
        this.currentName=chat.currentUsername;
        this.selectedChatRoomId=chat.chatRoomId;
        
      }
    })
    this.messageListRef = this.firestore.collection<Message>(`chatRooms/${id}/message`, ref => ref.orderBy('time','asc'));
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
      
      return res.currentPhone.includes(searchText) || res.receivePhone.includes(searchText) || res.currentUsername.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) || res.receiveUsername.toLocaleLowerCase().includes(searchText.toLocaleLowerCase());
    })
  }
 



}
