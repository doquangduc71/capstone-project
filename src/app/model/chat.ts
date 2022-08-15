import { Timestamp } from '@angular/fire/firestore';
import { ProfileUser } from './user-profile';

export interface Chat {
  chatRoomId    : string;
  lastMessage?: string;
  lastMessageDate?: Date & Timestamp;
  currentPhone:string;
  currentUsername:string;
  listUsers:string[];
  receivePhone:string;
  receiveUsername:string;

  // Not stored, only for display
  chatPic?: string;
  chatName?: string;
  
}

export interface Message {
  text: string;
  currentPhone:string;
  receivePhone:string;
  time: Date & Timestamp;
  type:string;
}
export interface ListMedicalRecordHistory {
  appointmentId: string;
  doctorId:string;
  doctorName:string;
}
export interface Link {
  url:string;
  time: Date & Timestamp;
}


