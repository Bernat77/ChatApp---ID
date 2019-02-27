import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatroomService {

  public chatrooms: Observable<any>;

  constructor(private db: AngularFirestore) {
    this.chatrooms = db.collection('chatrooms').valueChanges(); //getvalue
   }
}