import { Component } from '@angular/core';
import { ChatService } from '../../Services/chat.service';
import { AuthService } from '../../Services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { map } from 'rxjs';

export interface Message {
  message: string,
  sender: string
}

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent {

  message:string = '';
  messages:Message[] = []
  userId!: string;

  getUserId(){
    const token: string = localStorage.getItem("specialty_token") as string;

    this.authservice.checkUserDetails(token).subscribe(res => {
      this.userId = res.info.userId
      this.setHeaders();
    })
  }
  recipientId: string = "c58b30b2-07f3-44e7-84a0-714e445ef954"

  constructor(private socket: ChatService, private authservice: AuthService){
    this.getUserId()
    this.getMessage()
  }

  setHeaders(){
    console.log("Your id", this.userId);
    
    this.socket.ioSocket.io.opts.extraHeaders = {
      userId: this.userId
    };
    this.socket.connect()
}

  sendMessage(){
    this.socket.emit('message', {message: this.message, recipientId: this.recipientId});
    let messageObj = {
      message: this.message,
      sender: this.userId
    }

    this.messages.push(messageObj)
    console.log(this.messages);
    
    this.message = ''
  }
  getMessage(){
  this.socket.fromEvent('message').subscribe((data : any)=> {
    this.messages.push(data)
    this.recipientId = data.sender
  })
  }
}
