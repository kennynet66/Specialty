import { Component } from '@angular/core';
import { ChatService } from '../../../Services/chat.service';
import { AuthService } from '../../../Services/auth.service';
import { Message } from '../../messages/messages.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-specialist-message',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  templateUrl: './specialist-message.component.html',
  styleUrl: './specialist-message.component.css'
})
export class SpecialistMessageComponent {

  message:string = '';
  messages:Message[] = []
  senderId!: string;

  getUserId(){
    const token: string = localStorage.getItem("specialty_token") as string;

    this.authservice.checkUserDetails(token).subscribe(res => {
      this.senderId = res.info.userId
      this.setHeaders();
    })
  }
  recipientId: string = "c58b30b2-07f3-44e7-84a0-714e445ef954"

  constructor(private socket: ChatService, private authservice: AuthService){
    this.getUserId()
    this.getMessage()
  }

  setHeaders(){
    console.log("Your id", this.senderId);
    
    this.socket.ioSocket.io.opts.extraHeaders = {
      senderId: this.senderId
    };
    this.socket.connect()
}

  sendMessage(){
    this.socket.emit('message', {message: this.message, recipientId: this.recipientId});
    let messageObj = {
      message: this.message,
      sender: this.senderId
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
