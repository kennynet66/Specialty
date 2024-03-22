import { Component } from '@angular/core';
import { ChatService } from '../../../Services/chat.service';
import { AuthService } from '../../../Services/auth.service';
import { Message } from '../../messages/messages.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-message',
  standalone: true,
  imports: [ CommonModule, FormsModule],
  templateUrl: './user-message.component.html',
  styleUrl: './user-message.component.css'
})
export class UserMessageComponent {

  message:string = '';
  messages:Message[] = []
  senderId!: string;
  recipientId!: string;

  getRecepientId(){
    this.route.params.subscribe(params => {
      this.recipientId = params['id']
    })
  }

  getUserId(){
    const token: string = localStorage.getItem("specialty_token") as string;

    this.authservice.checkUserDetails(token).subscribe(res => {
      this.senderId = res.info.userId
      this.setHeaders();
      this.getRecepientId();
    })
  }

  constructor(private socket: ChatService, private authservice: AuthService, private route: ActivatedRoute){
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
