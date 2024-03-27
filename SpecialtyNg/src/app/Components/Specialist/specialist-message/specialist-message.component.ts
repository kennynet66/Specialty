import { Component } from '@angular/core';
import { ChatService } from '../../../Services/chat.service';
import { AuthService } from '../../../Services/auth.service';
import { Message } from '../../messages/messages.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-specialist-message',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './specialist-message.component.html',
  styleUrl: './specialist-message.component.css'
})
export class SpecialistMessageComponent {

  // message:string = '';
  messages: any[] = []
  senderId!: string;

  messageForm!: FormGroup;

  getUserId() {
    const token: string = localStorage.getItem("specialty_token") as string;

    this.authservice.checkUserDetails(token).subscribe(res => {
      this.senderId = res.info.userId
      this.setHeaders();
    })
  }
  recipientId!: string

  constructor(private socket: ChatService, private authservice: AuthService, private fb: FormBuilder) {
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
    if (this.messageForm.valid) {
      this.socket.emit('message', { message: this.messageForm.value.message, recipientId: this.recipientId });
      let messageObj = {
        message: this.messageForm.value.message,
        senderId: this.senderId
      }

      console.log(messageObj);
      

      this.messages.push(messageObj)
      console.log(this.messages);
      this.messageForm.reset();

    }

  }
  getMessage() {
    this.socket.fromEvent('message').subscribe((data: any) => {
      console.log(data);
      
      this.messages.push(data)
      this.recipientId = data.senderId
    })
  }
}
