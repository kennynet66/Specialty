import { Component } from '@angular/core';
import { ChatService } from '../../../Services/chat.service';
import { AuthService } from '../../../Services/auth.service';
import { Message } from '../../messages/messages.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-message',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user-message.component.html',
  styleUrl: './user-message.component.css'
})
export class UserMessageComponent {

  // message: string = '';
  messages: Message[] = []
  senderId!: string;
  recipientId!: string;
  messageForm!: FormGroup

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
    })
  }

  constructor(private socket: ChatService, private authservice: AuthService, private route: ActivatedRoute, private fb: FormBuilder) {
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
      sender: this.senderId
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
}
