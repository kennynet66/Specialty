import { Component } from '@angular/core';
import { ChatService } from '../../Services/chat.service';
// import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [  ],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent {
  constructor(private socket: ChatService){}
}
