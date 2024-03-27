import { Component } from '@angular/core';
import { ChatService } from '../../../Services/chat.service';
import { AuthService } from '../../../Services/auth.service';
import { Message } from '../../messages/messages.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from '../../../Services/message.service';
import { Chat, MessageInterface } from '../../../Interfaces/message.Interface';

@Component({
  selector: 'app-user-message',
  standalone: true,
  imports: [ CommonModule, FormsModule, ReactiveFormsModule ],
  templateUrl: './user-message.component.html',
  styleUrl: './user-message.component.css'
})
export class UserMessageComponent {

  // message: string = '';
  messages: any[] = []
  senderId!: string;
  recipientId!: string;
  messageForm!: FormGroup;
  chats: Chat[] = []
  Messages:MessageInterface [] = []

  getRecepientId() {
    this.route.params.subscribe(params => {
      this.recipientId = params['id']
    })
    this.socket.emit('create-chat', { senderId: this.senderId, receiverId: this.recipientId })
  }

  getUserId() {
    const token: string = localStorage.getItem("specialty_token") as string;

    this.authservice.checkUserDetails(token).subscribe(res => {
      this.senderId = res.info.userId
      this.setHeaders();
      this.getRecepientId();
      this.getChats(this.senderId)
    })
  }

  constructor(private socket: ChatService, private authservice: AuthService, private route: ActivatedRoute, private fb: FormBuilder, private messageservice: MessageService) {
    this.messageForm = this.fb.group({
      message: ['', Validators.required]
    })
    this.getUserId()
    this.getMessage()
  }

  setHeaders() {
    console.log("Your id", this.senderId);

    this.socket.ioSocket.io.opts.extraHeaders = {
      senderId: this.senderId
    };
    this.socket.connect()
  }

  sendMessage() {
    if(this.messageForm.valid){
    this.socket.emit('message', { message: this.messageForm.value.message, recipientId: this.recipientId });
    let messageObj = {
      message: this.messageForm.value.message,
      senderId: this.senderId
    }

    this.messages.push(messageObj)
    console.log(this.messages);
    this.messageForm.reset()
  }


  }
  getMessage() {
    this.socket.fromEvent('message').subscribe((data: any) => {
      this.messages.push(data);
      // this.recipientId = data.sender;
    });
  }

  getChats(userId: string){
    this.messageservice.getChats(userId).subscribe(res => {
      res.chats.forEach(chat => {
        this.chats.push(chat)
      })
    })
  }

  getMessages(chatId: string){
    this.messageservice.getMessages(chatId).subscribe(res => {
      console.log(res);
      res.messages.forEach(message => {
        console.log(message.senderId);
        
        this.messages.push(message)
      })
      
    })
  }
}
