import { Component, OnInit } from '@angular/core';
import { ChatroomService } from 'src/app/services/chatroom.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit {
//the constructor recives the chatroomservice which uses the html
  constructor(public chatroomService: ChatroomService) { }

  ngOnInit() {
  }

}
